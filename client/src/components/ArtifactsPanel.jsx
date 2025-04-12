// components/admin/ArtifactsPanel.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const ArtifactsPanel = () => {
  const [artifacts, setArtifacts] = useState([]);
  const [newArtifact, setNewArtifact] = useState({ title: '', type: '', era: '', description: '', location: '', images: null, conservationStatus: '', mural: '' });
  const [editingArtifact, setEditingArtifact] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchArtifacts();
  }, []);

  const fetchArtifacts = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("http://localhost:4000/api/artifacts");
      setArtifacts(res.data);
    } catch (error) {
      setMessage({ text: 'Error fetching artifacts', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (file) => {
    if (!file) return null;
    const storageRef = ref(storage, `artifacts/${file.name}_${Date.now()}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  };

  const handleDeleteImageFromStorage = async (imageURL) => {
    if (!imageURL) return;
    try {
      const path = decodeURIComponent(new URL(imageURL).pathname.split("/o/")[1].split("?")[0]);
      const imageRef = ref(storage, path);
      await deleteObject(imageRef);
    } catch (err) {
      console.warn("Image deletion warning:", err.message);
    }
  };

  const handleCreateArtifact = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      let imageURL = '';
      if (newArtifact.images) imageURL = await handleImageUpload(newArtifact.images);

      const artifactData = {
        title: newArtifact.title.trim(),
        type: newArtifact.type?.trim() || "",
        era: newArtifact.era?.trim() || "",
        description: newArtifact.description?.trim() || "",
        location: newArtifact.location?.trim() || "",
        conservationStatus: newArtifact.conservationStatus?.trim() || "",
        images: imageURL
      };

      await axios.post("http://localhost:4000/api/artifacts", artifactData);
      setNewArtifact({ title: '', type: '', era: '', description: '', location: '', images: null, conservationStatus: '', mural: '' });
      fetchArtifacts();
      setMessage({ text: 'Artifact created successfully', type: 'success' });
    } catch (error) {
      setMessage({ text: 'Error creating artifact', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditArtifact = (artifact) => {
    setEditingArtifact({ ...artifact, newImageFile: null });
  };

  const handleUpdateArtifact = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      let imageURL = editingArtifact.images;

      if (editingArtifact.newImageFile) {
        await handleDeleteImageFromStorage(editingArtifact.images);
        imageURL = await handleImageUpload(editingArtifact.newImageFile);
      }

      const updatedData = {
        _id: editingArtifact._id,
        title: editingArtifact.title.trim(),
        type: editingArtifact.type?.trim() || "",
        era: editingArtifact.era?.trim() || "",
        description: editingArtifact.description?.trim() || "",
        location: editingArtifact.location?.trim() || "",
        conservationStatus: editingArtifact.conservationStatus?.trim() || "",
        images: imageURL
      };

      await axios.put(`http://localhost:4000/api/artifacts/${editingArtifact._id}`, updatedData);
      setEditingArtifact(null);
      fetchArtifacts();
      setMessage({ text: 'Artifact updated successfully', type: 'success' });
    } catch (error) {
      setMessage({ text: 'Error updating artifact', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteArtifact = async (id) => {
    const artifactToDelete = artifacts.find(a => a._id === id);
    if (!window.confirm("Are you sure you want to delete this artifact?")) return;
    try {
      setIsLoading(true);
      await axios.delete(`http://localhost:4000/api/artifacts/${id}`);
      await handleDeleteImageFromStorage(artifactToDelete?.images);
      setArtifacts(prev => prev.filter(a => a._id !== id));
      setMessage({ text: 'Artifact deleted', type: 'success' });
    } catch (error) {
      setMessage({ text: 'Error deleting artifact', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="tab-content">
      <h2>Artifacts Management</h2>
      {message.text && <div className={`message ${message.type}`}>
        {message.text}
        <button onClick={() => setMessage({ text: '', type: '' })}>x</button>
      </div>}

      {isLoading && <div className="loading-spinner">Loading...</div>}

      {editingArtifact ? (
        <div className="edit-form">
          <h3>Edit Artifact</h3>
          <form onSubmit={handleUpdateArtifact}>
            <div className="form-group">
              <label>Title:</label>
              <input type="text" value={editingArtifact.title} onChange={(e) => setEditingArtifact({ ...editingArtifact, title: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Type:</label>
              <input type="text" value={editingArtifact.type || ''} onChange={(e) => setEditingArtifact({ ...editingArtifact, type: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Era:</label>
              <input type="text" value={editingArtifact.era || ''} onChange={(e) => setEditingArtifact({ ...editingArtifact, era: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Location:</label>
              <input type="text" value={editingArtifact.location || ''} onChange={(e) => setEditingArtifact({ ...editingArtifact, location: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Replace Image:</label>
              <input type="file" accept="image/*" onChange={(e) => setEditingArtifact({ ...editingArtifact, newImageFile: e.target.files[0] })} />
            </div>
            <div className="form-group">
              <label>Conservation Status:</label>
              <input type="text" value={editingArtifact.conservationStatus || ''} onChange={(e) => setEditingArtifact({ ...editingArtifact, conservationStatus: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea value={editingArtifact.description || ''} onChange={(e) => setEditingArtifact({ ...editingArtifact, description: e.target.value })} rows="4" />
            </div>
            <div className="form-actions">
              <button type="submit" className="save-btn">Save Changes</button>
              <button type="button" className="cancel-btn" onClick={() => setEditingArtifact(null)}>Cancel</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="create-form">
          <h3>Create New Artifact</h3>
          <form onSubmit={handleCreateArtifact}>
            <div className="form-group">
              <label>Title:</label>
              <input type="text" value={newArtifact.title} onChange={(e) => setNewArtifact({ ...newArtifact, title: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Type:</label>
              <input type="text" value={newArtifact.type} onChange={(e) => setNewArtifact({ ...newArtifact, type: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Era:</label>
              <input type="text" value={newArtifact.era} onChange={(e) => setNewArtifact({ ...newArtifact, era: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Location:</label>
              <input type="text" value={newArtifact.location} onChange={(e) => setNewArtifact({ ...newArtifact, location: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Upload Image:</label>
              <input type="file" accept="image/*" onChange={(e) => setNewArtifact({ ...newArtifact, images: e.target.files[0] })} />
            </div>
            <div className="form-group">
              <label>Conservation Status:</label>
              <input type="text" value={newArtifact.conservationStatus} onChange={(e) => setNewArtifact({ ...newArtifact, conservationStatus: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea value={newArtifact.description} onChange={(e) => setNewArtifact({ ...newArtifact, description: e.target.value })} rows="4" />
            </div>
            <button type="submit" className="create-btn">Create Artifact</button>
          </form>
        </div>
      )}

      <div className="data-list">
        <h3>Artifacts List ({artifacts.length})</h3>
        {artifacts.length === 0 ? <p>No artifacts found.</p> : (
          <div className="data-table">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Era</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {artifacts.map(artifact => (
                  <tr key={artifact._id}>
                    <td className="artifact-image-cell">
                      {artifact.images ? (
                        <img src={artifact.images} alt={artifact.title} className="artifact-thumbnail" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/60x60?text=No+Image"; }} />
                      ) : (
                        <div className="no-image">No image</div>
                      )}
                    </td>
                    <td>{artifact.title}</td>
                    <td>{artifact.type || '-'}</td>
                    <td>{artifact.era || '-'}</td>
                    <td className="action-buttons">
                      <button onClick={() => handleEditArtifact(artifact)} className="edit-btn">Edit</button>
                      <button onClick={() => handleDeleteArtifact(artifact._id)} className="delete-btn">Delete</button>
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

export default ArtifactsPanel;