import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const muralsPanel = () => {
  const [murals, setmurals] = useState([]);
  const [newmural, setNewmural] = useState({ name: '', creationPeriod: '', architecturalFeatures: '', significance: '', images: null, category: '' });
  const [editingmural, setEditingmural] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchmurals();
  }, []);

  const fetchmurals = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("http://localhost:4000/api/mural");
      const data = res.data;
      console.log("Fetched murals:", data);

      if (Array.isArray(data)) {
        setmurals(data);
      } else if (Array.isArray(data.murals)) {
        setmurals(data.murals);
      } else {
        setmurals([]);
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

  const handleCreatemural = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      let imageURL = '';
      if (newmural.images) imageURL = await handleImageUpload(newmural.images);

      const muralData = {
        name: newmural.name.trim(),
        creationPeriod: newmural.creationPeriod?.trim() || "",
        architecturalFeatures: newmural.architecturalFeatures?.trim() || "",
        significance: newmural.significance?.trim() || "",
        category: newmural.category?.trim() || "",
        images: imageURL
      };

      await axios.post("http://localhost:4000/api/murals", muralData);
      setNewmural({ name: '', creationPeriod: '', architecturalFeatures: '', significance: '', category: '', images: null });
      fetchmurals();
      setMessage({ text: 'mural created successfully', type: 'success' });
    } catch (error) {
      setMessage({ text: 'Error creating mural', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditmural = (mural) => {
    setEditingmural({ ...mural, newImageFile: null });
  };

  const handleUpdatemural = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      let imageURL = editingmural.images;

      if (editingmural.newImageFile) {
        await handleDeleteImageFromStorage(editingmural.images);
        imageURL = await handleImageUpload(editingmural.newImageFile);
      }

      const updatedData = {
        _id: editingmural._id,
        name: editingmural.name.trim(),
        creationPeriod: editingmural.creationPeriod?.trim() || "",
        architecturalFeatures: editingmural.architecturalFeatures?.trim() || "",
        significance: editingmural.significance?.trim() || "",
        images: imageURL,
        category: editingmural.category?.trim() || ""
      };

      await axios.put(`http://localhost:4000/api/murals/${editingmural._id}`, updatedData);
      setEditingmural(null);
      fetchmurals();
      setMessage({ text: 'mural updated successfully', type: 'success' });
    } catch (error) {
      setMessage({ text: 'Error updating mural', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletemural = async (id) => {
    const muralToDelete = murals.find((c) => c._id === id);
    if (!window.confirm("Are you sure you want to delete this mural?")) return;
    try {
      setIsLoading(true);
      await axios.delete(`http://localhost:4000/api/murals/${id}`);
      await handleDeleteImageFromStorage(muralToDelete?.images);
      setmurals(prev => prev.filter(c => c._id !== id));
      setMessage({ text: 'mural deleted', type: 'success' });
    } catch (error) {
      setMessage({ text: 'Error deleting mural', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="tab-content">
      <h2>Murals Management</h2>
      {message.text && <div className={`message ${message.type}`}>
        {message.text}
        <button onClick={() => setMessage({ text: '', type: '' })}>x</button>
      </div>}

      {isLoading && <div className="loading-spinner">Loading...</div>}

      {editingmural ? (
        <div className="edit-form">
          <h3>Edit mural</h3>
          <form onSubmit={handleUpdatemural}>
            <div className="form-group">
              <label>Name:</label>
              <input type="text" value={editingmural.name} onChange={(e) => setEditingmural({ ...editingmural, name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Creation Period:</label>
              <input type="text" value={editingmural.creationPeriod || ''} onChange={(e) => setEditingmural({ ...editingmural, creationPeriod: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Category:</label>
              <select value={editingmural.category || ''} onChange={(e) => setEditingmural({ ...editingmural, category: e.target.value })} required>
                <option value="">Select Category</option>
                <option value="Animal">Animal</option>
                <option value="Dance">Dance</option>
                <option value="Architecture">Architecture</option>
                <option value="Flying">Flying</option>
              </select>
            </div>
            <div className="form-group">
              <label>Architectural Features:</label>
              <textarea value={editingmural.architecturalFeatures || ''} onChange={(e) => setEditingmural({ ...editingmural, architecturalFeatures: e.target.value })} rows="3" />
            </div>
            <div className="form-group">
              <label>Cultural Significance:</label>
              <textarea value={editingmural.significance || ''} onChange={(e) => setEditingmural({ ...editingmural, significance: e.target.value })} rows="4" />
            </div>
            <div className="form-group">
              <label>Replace Image:</label>
              <input type="file" accept="image/*" onChange={(e) => setEditingmural({ ...editingmural, newImageFile: e.target.files[0] })} />
            </div>
            <div className="form-actions">
              <button type="submit" className="save-btn">Save Changes</button>
              <button type="button" className="cancel-btn" onClick={() => setEditingmural(null)}>Cancel</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="create-form">
          <h3>Create New mural</h3>
          <form onSubmit={handleCreatemural}>
            <div className="form-group">
              <label>Name:</label>
              <input type="text" value={newmural.name} onChange={(e) => setNewmural({ ...newmural, name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Creation Period:</label>
              <input type="text" value={newmural.creationPeriod} onChange={(e) => setNewmural({ ...newmural, creationPeriod: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Category:</label>
              <select value={newmural.category} onChange={(e) => setNewmural({ ...newmural, category: e.target.value })} required>
                <option value="">Select Category</option>
                <option value="Animal">Animal</option>
                <option value="Dance">Dance</option>
                <option value="Architecture">Architecture</option>
                <option value="Flying">Flying</option>
              </select>
            </div>
            <div className="form-group">
              <label>Architectural Features:</label>
              <textarea value={newmural.architecturalFeatures} onChange={(e) => setNewmural({ ...newmural, architecturalFeatures: e.target.value })} rows="3" />
            </div>
            <div className="form-group">
              <label>Cultural Significance:</label>
              <textarea value={newmural.significance} onChange={(e) => setNewmural({ ...newmural, significance: e.target.value })} rows="4" />
            </div>
            <div className="form-group">
              <label>Upload Image:</label>
              <input type="file" accept="image/*" onChange={(e) => setNewmural({ ...newmural, images: e.target.files[0] })} />
            </div>
            <button type="submit" className="create-btn">Create mural</button>
          </form>
        </div>
      )}

      <div className="data-list">
        <h3>murals List ({Array.isArray(murals) ? murals.length : 0})</h3>
        {Array.isArray(murals) && murals.length === 0 ? (
          <p>No murals found.</p>
        ) : (
          <div className="data-table">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Creation Period</th>
                  <th>Artifacts</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(murals) && murals.map(mural => (
                  <tr key={mural._id}>
                    <td className="artifact-image-cell">
                      {mural.images ? (
                        <img src={mural.images} alt={mural.name} className="artifact-thumbnail"
                             onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/60x60?text=No+Image"; }} />
                      ) : (
                        <div className="no-image">No image</div>
                      )}
                    </td>
                    <td>{mural.name}</td>
                    <td>{mural.creationPeriod || '-'}</td>
                    <td>{mural.artifacts ? mural.artifacts.length : 0}</td>
                    <td className="action-buttons">
                      <button onClick={() => handleEditmural(mural)} className="edit-btn">Edit</button>
                      <button onClick={() => handleDeletemural(mural._id)} className="delete-btn">Delete</button>
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

export default muralsPanel;
