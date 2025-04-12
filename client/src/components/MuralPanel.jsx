import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const MuralsPanel = () => {
  const [murals, setMurals] = useState([]);
  const [newMural, setNewMural] = useState({ title: '', period: '', location: '', description: '', images: null, subCategory: '' });
  const [editingMural, setEditingMural] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchMurals();
  }, []);

  const fetchMurals = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("http://localhost:4000/api/mural");
      const data = res.data;
      console.log("Fetched murals:", data);

      if (Array.isArray(data)) {
        setMurals(data);
      } else if (Array.isArray(data.murals)) {
        setMurals(data.murals);
      } else {
        setMurals([]);
        setMessage({ text: 'Invalid murals data received', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Error fetching murals', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (file) => {
    if (!file) return null;
    const storageRef = ref(storage, `muralImages/${file.name}_${Date.now()}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  };

  const handleDeleteImageFromStorage = async (imageURL) => {
    if (!imageURL) return;
    try {
      const imageRef = ref(storage, decodeURIComponent(new URL(imageURL).pathname.split("/o/")[1].split("?")[0]));
      await deleteObject(imageRef);
    } catch (err) {
      console.warn("Image deletion warning:", err.message);
    }
  };

  const handleCreateMural = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      let imageURL = '';
      if (newMural.images) imageURL = await handleImageUpload(newMural.images);

      const muralData = {
        title: newMural.title.trim(),
        period: newMural.period?.trim() || "",
        location: newMural.location?.trim() || "",
        description: newMural.description?.trim() || "",
        subCategory: newMural.subCategory?.trim() || "",
        images: imageURL ? [imageURL] : []
      };

      await axios.post("http://localhost:4000/api/murals", muralData);
      setNewMural({ title: '', period: '', location: '', description: '', subCategory: '', images: null });
      fetchMurals();
      setMessage({ text: 'Mural created successfully', type: 'success' });
    } catch (error) {
      setMessage({ text: 'Error creating mural', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditMural = (mural) => {
    setEditingMural({ ...mural, newImageFile: null });
  };

  const handleUpdateMural = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      let imageURL = editingMural.images;

      if (editingMural.newImageFile) {
        await handleDeleteImageFromStorage(editingMural.images?.[0]);
        const uploaded = await handleImageUpload(editingMural.newImageFile);
        imageURL = uploaded ? [uploaded] : [];
      }

      const updatedData = {
        _id: editingMural._id,
        title: editingMural.title.trim(),
        period: editingMural.period?.trim() || "",
        location: editingMural.location?.trim() || "",
        description: editingMural.description?.trim() || "",
        subCategory: editingMural.subCategory?.trim() || "",
        images: imageURL
      };

      await axios.put(`http://localhost:4000/api/murals/${editingMural._id}`, updatedData);
      setEditingMural(null);
      fetchMurals();
      setMessage({ text: 'Mural updated successfully', type: 'success' });
    } catch (error) {
      setMessage({ text: 'Error updating mural', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMural = async (id) => {
    const muralToDelete = murals.find((c) => c._id === id);
    if (!window.confirm("Are you sure you want to delete this mural?")) return;
    try {
      setIsLoading(true);
      await axios.delete(`http://localhost:4000/api/murals/${id}`);
      await handleDeleteImageFromStorage(muralToDelete?.images?.[0]);
      setMurals(prev => prev.filter(c => c._id !== id));
      setMessage({ text: 'Mural deleted', type: 'success' });
    } catch (error) {
      setMessage({ text: 'Error deleting mural', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="tab-content">
      <h2>Murals Management</h2>
      {message.text && (
        <div className={message.type}>
          {message.text}
          <button onClick={() => setMessage({ text: '', type: '' })}>x</button>
        </div>
      )}

      {isLoading && <div className="loading-spinner">Loading...</div>}

      {/* CREATE FORM */}
      {!editingMural ? (
        <div className="create-form">
          <h3>Create New Mural</h3>
          <form onSubmit={handleCreateMural}>
            <div className="form-group">
              <label>Title:</label>
              <input type="text" value={newMural.title} onChange={(e) => setNewMural({ ...newMural, title: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Period:</label>
              <input type="text" value={newMural.period} onChange={(e) => setNewMural({ ...newMural, period: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Sub Category:</label>
              <select value={newMural.subCategory} onChange={(e) => setNewMural({ ...newMural, subCategory: e.target.value })} required>
                <option value="">Select Sub Category</option>
                <option value="Animal">Animal</option>
                <option value="Dance">Dance</option>
                <option value="Architecture">Architecture</option>
                <option value="Flying">Flying</option>
              </select>
            </div>
            <div className="form-group">
              <label>Location:</label>
              <textarea value={newMural.location} onChange={(e) => setNewMural({ ...newMural, location: e.target.value })} rows="3" />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea value={newMural.description} onChange={(e) => setNewMural({ ...newMural, description: e.target.value })} rows="4" />
            </div>
            <div className="form-group">
              <label>Upload Image:</label>
              <input type="file" accept="image/*" onChange={(e) => setNewMural({ ...newMural, images: e.target.files[0] })} />
            </div>
            <button type="submit" className="create-btn">Create Mural</button>
          </form>
        </div>
      ) : (
        <div className="edit-form">
          <h3>Edit Mural</h3>
          <form onSubmit={handleUpdateMural}>
            <div className="form-group">
              <label>Title:</label>
              <input type="text" value={editingMural.title} onChange={(e) => setEditingMural({ ...editingMural, title: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Period:</label>
              <input type="text" value={editingMural.period || ''} onChange={(e) => setEditingMural({ ...editingMural, period: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Sub Category:</label>
              <select value={editingMural.subCategory || ''} onChange={(e) => setEditingMural({ ...editingMural, subCategory: e.target.value })} required>
                <option value="">Select Sub Category</option>
                <option value="Animal">Animal</option>
                <option value="Dance">Dance</option>
                <option value="Architecture">Architecture</option>
                <option value="Flying">Flying</option>
              </select>
            </div>
            <div className="form-group">
              <label>Location:</label>
              <textarea value={editingMural.location || ''} onChange={(e) => setEditingMural({ ...editingMural, location: e.target.value })} rows="3" />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea value={editingMural.description || ''} onChange={(e) => setEditingMural({ ...editingMural, description: e.target.value })} rows="4" />
            </div>
            <div className="form-group">
              <label>Replace Image:</label>
              <input type="file" accept="image/*" onChange={(e) => setEditingMural({ ...editingMural, newImageFile: e.target.files[0] })} />
            </div>
            <div className="form-actions">
              <button type="submit" className="save-btn">Save Changes</button>
              <button type="button" className="cancel-btn" onClick={() => setEditingMural(null)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* LIST */}
      <div className="data-list">
        <h3>Murals List ({Array.isArray(murals) ? murals.length : 0})</h3>
        {murals.length === 0 ? (
          <p>No murals found.</p>
        ) : (
          <div className="data-table">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Period</th>
                  <th>Artifacts</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {murals.map(mural => (
                  <tr key={mural._id}>
                    <td className="artifact-image-cell">
                      {mural.images && mural.images.length > 0 ? (
                        <img
                          src={mural.images[0]}
                          alt={mural.title}
                          className="artifact-thumbnail"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://placehold.co/60x60?text=No+Image";
                          }}
                        />
                      ) : (
                        <div className="no-image">No image</div>
                      )}
                    </td>
                    <td>{mural.title || '-'}</td>
                    <td>{mural.period || '-'}</td>
                    <td>{mural.artifacts ? mural.artifacts.length : 0}</td>
                    <td className="action-buttons">
                      <button onClick={() => handleEditMural(mural)} className="edit-btn">Edit</button>
                      <button onClick={() => handleDeleteMural(mural._id)} className="delete-btn">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MuralsPanel;