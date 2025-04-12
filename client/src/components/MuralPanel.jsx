import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const muralsPanel = () => {
  const [murals, setmurals] = useState([]);
  const [newCave, setNewCave] = useState({ name: '', creationPeriod: '', architecturalFeatures: '', significance: '', images: null, category: '' });
  const [editingCave, setEditingCave] = useState(null);
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
    const storageRef = ref(storage, `caveImages/${file.name}_${Date.now()}`);
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

  const handleCreateCave = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      let imageURL = '';
      if (newCave.images) imageURL = await handleImageUpload(newCave.images);

      const caveData = {
        name: newCave.name.trim(),
        creationPeriod: newCave.creationPeriod?.trim() || "",
        architecturalFeatures: newCave.architecturalFeatures?.trim() || "",
        significance: newCave.significance?.trim() || "",
        category: newCave.category?.trim() || "",
        images: imageURL
      };

      await axios.post("http://localhost:4000/api/murals", caveData);
      setNewCave({ name: '', creationPeriod: '', architecturalFeatures: '', significance: '', category: '', images: null });
      fetchmurals();
      setMessage({ text: 'Cave created successfully', type: 'success' });
    } catch (error) {
      setMessage({ text: 'Error creating cave', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditCave = (cave) => {
    setEditingCave({ ...cave, newImageFile: null });
  };

  const handleUpdateCave = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      let imageURL = editingCave.images;

      if (editingCave.newImageFile) {
        await handleDeleteImageFromStorage(editingCave.images);
        imageURL = await handleImageUpload(editingCave.newImageFile);
      }

      const updatedData = {
        _id: editingCave._id,
        name: editingCave.name.trim(),
        creationPeriod: editingCave.creationPeriod?.trim() || "",
        architecturalFeatures: editingCave.architecturalFeatures?.trim() || "",
        significance: editingCave.significance?.trim() || "",
        images: imageURL,
        category: editingCave.category?.trim() || ""
      };

      await axios.put(`http://localhost:4000/api/murals/${editingCave._id}`, updatedData);
      setEditingCave(null);
      fetchmurals();
      setMessage({ text: 'Cave updated successfully', type: 'success' });
    } catch (error) {
      setMessage({ text: 'Error updating cave', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCave = async (id) => {
    const caveToDelete = murals.find((c) => c._id === id);
    if (!window.confirm("Are you sure you want to delete this cave?")) return;
    try {
      setIsLoading(true);
      await axios.delete(`http://localhost:4000/api/murals/${id}`);
      await handleDeleteImageFromStorage(caveToDelete?.images);
      setmurals(prev => prev.filter(c => c._id !== id));
      setMessage({ text: 'Cave deleted', type: 'success' });
    } catch (error) {
      setMessage({ text: 'Error deleting cave', type: 'error' });
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

      {editingCave ? (
        <div className="edit-form">
          <h3>Edit Cave</h3>
          <form onSubmit={handleUpdateCave}>
            <div className="form-group">
              <label>Name:</label>
              <input type="text" value={editingCave.name} onChange={(e) => setEditingCave({ ...editingCave, name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Creation Period:</label>
              <input type="text" value={editingCave.creationPeriod || ''} onChange={(e) => setEditingCave({ ...editingCave, creationPeriod: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Category:</label>
              <select value={editingCave.category || ''} onChange={(e) => setEditingCave({ ...editingCave, category: e.target.value })} required>
                <option value="">Select Category</option>
                <option value="Animal">Animal</option>
                <option value="Dance">Dance</option>
                <option value="Architecture">Architecture</option>
                <option value="Flying">Flying</option>
              </select>
            </div>
            <div className="form-group">
              <label>Architectural Features:</label>
              <textarea value={editingCave.architecturalFeatures || ''} onChange={(e) => setEditingCave({ ...editingCave, architecturalFeatures: e.target.value })} rows="3" />
            </div>
            <div className="form-group">
              <label>Cultural Significance:</label>
              <textarea value={editingCave.significance || ''} onChange={(e) => setEditingCave({ ...editingCave, significance: e.target.value })} rows="4" />
            </div>
            <div className="form-group">
              <label>Replace Image:</label>
              <input type="file" accept="image/*" onChange={(e) => setEditingCave({ ...editingCave, newImageFile: e.target.files[0] })} />
            </div>
            <div className="form-actions">
              <button type="submit" className="save-btn">Save Changes</button>
              <button type="button" className="cancel-btn" onClick={() => setEditingCave(null)}>Cancel</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="create-form">
          <h3>Create New Cave</h3>
          <form onSubmit={handleCreateCave}>
            <div className="form-group">
              <label>Name:</label>
              <input type="text" value={newCave.name} onChange={(e) => setNewCave({ ...newCave, name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Creation Period:</label>
              <input type="text" value={newCave.creationPeriod} onChange={(e) => setNewCave({ ...newCave, creationPeriod: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Category:</label>
              <select value={newCave.category} onChange={(e) => setNewCave({ ...newCave, category: e.target.value })} required>
                <option value="">Select Category</option>
                <option value="Animal">Animal</option>
                <option value="Dance">Dance</option>
                <option value="Architecture">Architecture</option>
                <option value="Flying">Flying</option>
              </select>
            </div>
            <div className="form-group">
              <label>Architectural Features:</label>
              <textarea value={newCave.architecturalFeatures} onChange={(e) => setNewCave({ ...newCave, architecturalFeatures: e.target.value })} rows="3" />
            </div>
            <div className="form-group">
              <label>Cultural Significance:</label>
              <textarea value={newCave.significance} onChange={(e) => setNewCave({ ...newCave, significance: e.target.value })} rows="4" />
            </div>
            <div className="form-group">
              <label>Upload Image:</label>
              <input type="file" accept="image/*" onChange={(e) => setNewCave({ ...newCave, images: e.target.files[0] })} />
            </div>
            <button type="submit" className="create-btn">Create Cave</button>
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
                {Array.isArray(murals) && murals.map(cave => (
                  <tr key={cave._id}>
                    <td className="artifact-image-cell">
                      {cave.images ? (
                        <img src={cave.images} alt={cave.name} className="artifact-thumbnail"
                             onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/60x60?text=No+Image"; }} />
                      ) : (
                        <div className="no-image">No image</div>
                      )}
                    </td>
                    <td>{cave.name}</td>
                    <td>{cave.creationPeriod || '-'}</td>
                    <td>{cave.artifacts ? cave.artifacts.length : 0}</td>
                    <td className="action-buttons">
                      <button onClick={() => handleEditCave(cave)} className="edit-btn">Edit</button>
                      <button onClick={() => handleDeleteCave(cave._id)} className="delete-btn">Delete</button>
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
