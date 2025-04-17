import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const ExhibitionsPanel = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [newExhibition, setNewExhibition] = useState({ title: '', theme: '', image: null, startDate: '', endDate: '', location: '', narrative: '' });
  const [editingExhibition, setEditingExhibition] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchExhibitions();
  }, []);

  const fetchExhibitions = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/exhibitions");
      setExhibitions(res.data);
    } catch (error) {
      setMessage({ text: 'Error fetching exhibitions', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (file) => {
    if (!file) return null;
    const storageRef = ref(storage, `exhibitionImages/${file.name}_${Date.now()}`);
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

  const handleCreateExhibition = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      let imageURL = '';
      if (newExhibition.image) imageURL = await handleImageUpload(newExhibition.image);

      const data = {
        title: newExhibition.title.trim(),
        theme: newExhibition.theme.trim(),
        image: imageURL,
        startDate: newExhibition.startDate,
        endDate: newExhibition.endDate,
        location: newExhibition.location.trim(),
        narrative: newExhibition.narrative.trim()
      };

      await axios.post("/api/exhibitions", data);
      setNewExhibition({ title: '', theme: '', image: null, startDate: '', endDate: '', location: '', narrative: '' });
      fetchExhibitions();
      setMessage({ text: 'Exhibition created successfully', type: 'success' });
    } catch (error) {
      setMessage({ text: 'Error creating exhibition', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditExhibition = (exhibition) => {
    setEditingExhibition({ ...exhibition, newImageFile: null });
  };

  const handleUpdateExhibition = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      let imageURL = editingExhibition.image;

      if (editingExhibition.newImageFile) {
        await handleDeleteImageFromStorage(editingExhibition.image);
        imageURL = await handleImageUpload(editingExhibition.newImageFile);
      }

      const updatedData = {
        title: editingExhibition.title.trim(),
        theme: editingExhibition.theme.trim(),
        image: imageURL,
        startDate: editingExhibition.startDate,
        endDate: editingExhibition.endDate,
        location: editingExhibition.location.trim(),
        narrative: editingExhibition.narrative.trim()
      };

      await axios.put(`/api/exhibitions/${editingExhibition._id}`, updatedData);
      setEditingExhibition(null);
      fetchExhibitions();
      setMessage({ text: 'Exhibition updated successfully', type: 'success' });
    } catch (error) {
      setMessage({ text: 'Error updating exhibition', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteExhibition = async (id) => {
    const exhibitionToDelete = exhibitions.find(e => e._id === id);
    if (!window.confirm("Are you sure you want to delete this exhibition?")) return;
    try {
      setIsLoading(true);
      await axios.delete(`/api/exhibitions/${id}`);
      await handleDeleteImageFromStorage(exhibitionToDelete?.image);
      setExhibitions(prev => prev.filter(e => e._id !== id));
      setMessage({ text: 'Exhibition deleted successfully', type: 'success' });
    } catch (error) {
      setMessage({ text: 'Error deleting exhibition', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="tab-content">
      <h2>Exhibitions Management</h2>
      {message.text && <div className={`message ${message.type}`}>
        {message.text}
        <button onClick={() => setMessage({ text: '', type: '' })}>x</button>
      </div>}

      {isLoading && <div className="loading-spinner">Loading...</div>}

      {editingExhibition ? (
        <div className="edit-form">
          <h3>Edit Exhibition</h3>
          <form onSubmit={handleUpdateExhibition}>
            <div className="form-group">
              <label>Title:</label>
              <input type="text" value={editingExhibition.title} onChange={(e) => setEditingExhibition({ ...editingExhibition, title: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Theme:</label>
              <input type="text" value={editingExhibition.theme} onChange={(e) => setEditingExhibition({ ...editingExhibition, theme: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Start Date:</label>
              <input type="date" value={editingExhibition.startDate?.slice(0, 10)} onChange={(e) => setEditingExhibition({ ...editingExhibition, startDate: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>End Date:</label>
              <input type="date" value={editingExhibition.endDate?.slice(0, 10)} onChange={(e) => setEditingExhibition({ ...editingExhibition, endDate: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Location:</label>
              <input type="text" value={editingExhibition.location} onChange={(e) => setEditingExhibition({ ...editingExhibition, location: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Narrative:</label>
              <textarea value={editingExhibition.narrative} onChange={(e) => setEditingExhibition({ ...editingExhibition, narrative: e.target.value })} rows="4" required />
            </div>
            <div className="form-group">
              <label>Replace Image:</label>
              <input type="file" accept="image/*" onChange={(e) => setEditingExhibition({ ...editingExhibition, newImageFile: e.target.files[0] })} />
            </div>
            <div className="form-actions">
              <button type="submit" className="save-btn">Save Changes</button>
              <button type="button" className="cancel-btn" onClick={() => setEditingExhibition(null)}>Cancel</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="create-form">
          <h3>Create New Exhibition</h3>
          <form onSubmit={handleCreateExhibition}>
            <div className="form-group">
              <label>Title:</label>
              <input type="text" value={newExhibition.title} onChange={(e) => setNewExhibition({ ...newExhibition, title: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Theme:</label>
              <input type="text" value={newExhibition.theme} onChange={(e) => setNewExhibition({ ...newExhibition, theme: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Start Date:</label>
              <input type="date" value={newExhibition.startDate} onChange={(e) => setNewExhibition({ ...newExhibition, startDate: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>End Date:</label>
              <input type="date" value={newExhibition.endDate} onChange={(e) => setNewExhibition({ ...newExhibition, endDate: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Location:</label>
              <input type="text" value={newExhibition.location} onChange={(e) => setNewExhibition({ ...newExhibition, location: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Narrative:</label>
              <textarea value={newExhibition.narrative} onChange={(e) => setNewExhibition({ ...newExhibition, narrative: e.target.value })} rows="4" required />
            </div>
            <div className="form-group">
              <label>Upload Image:</label>
              <input type="file" accept="image/*" onChange={(e) => setNewExhibition({ ...newExhibition, image: e.target.files[0] })} required />
            </div>
            <button type="submit" className="create-btn">Create Exhibition</button>
          </form>
        </div>
      )}

      <div className="data-list">
        <h3>Exhibitions List ({exhibitions.length})</h3>
        {exhibitions.length === 0 ? <p>No exhibitions found.</p> : (
          <div className="data-table">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Theme</th>
                  <th>Dates</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {exhibitions.map(e => (
                  <tr key={e._id}>
                    <td className="artifact-image-cell">
                      {e.image ? (
                        <img src={e.image} alt={e.title} className="artifact-thumbnail" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/60x60?text=No+Image"; }} />
                      ) : (
                        <div className="no-image">No image</div>
                      )}
                    </td>
                    <td>{e.title}</td>
                    <td>{e.theme}</td>
                    <td>{e.startDate?.slice(0,10)} → {e.endDate?.slice(0,10)}</td>
                    <td className="action-buttons">
                      <button onClick={() => handleEditExhibition(e)} className="edit-btn">Edit</button>
                      <button onClick={() => handleDeleteExhibition(e._id)} className="delete-btn">Delete</button>
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

export default ExhibitionsPanel;