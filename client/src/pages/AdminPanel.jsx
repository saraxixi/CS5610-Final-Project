import React, { useState, useEffect }  from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import '../styles/AdminPanel.css';

const AdminPanel = () => {
  const role = localStorage.getItem("userRole");
  const [tab, setTab] = useState("users");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({text: '', type: ''});

  // create artifact
  const [artifacts, setArtifacts] = useState([]);
  const [newArtifact, setNewArtifact] = useState({ title: "", type: "", era: "", description: "", location: "", images: "", conservationStatus: "",  cave: "" });
  const [editingArtifact, setEditingArtifact] = useState(null);


  // caves state
  const [caves, setCaves] = useState([]);
  const [newCave, setNewCave] = useState({ name: "", creationPeriod: "", architecturalFeatures: "", significance: "" });
  const [editingCave, setEditingCave] = useState(null);

  // fetch artifacts and caves data
  const fetchArtifacts = async () => {
    try{
      setIsLoading(true);
      const res = await axios.get("http://localhost:4000/api/artifacts");
      setArtifacts(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching artifacts:", error);
      setMessage({text: 'Error fetching artifacts', type: 'error'});
      setIsLoading(false);
    }
  };

  const fetchCaves = async () => {
    try{
      setIsLoading(true);
      const res = await axios.get("http://localhost:4000/api/caves");
      setCaves(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching caves:", error);
      setMessage({text: 'Error fetching caves', type: 'error'});
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (role === "admin") {
      if (tab === "artifacts") {
        fetchArtifacts();
      }
      if (tab === "caves") {
        fetchCaves();
      }
    }
  }, [tab, role]);

  // create cave
  const handleCreateArtifact = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      
      const artifactData = {
        title: newArtifact.title.trim(),
        type: newArtifact.type?.trim() || "",
        era: newArtifact.era?.trim() || "",
        description: newArtifact.description?.trim() || "",
        location: newArtifact.location?.trim() || "",
        conservationStatus: newArtifact.conservationStatus?.trim() || "",
        images: newArtifact.images?.trim() 
          ? newArtifact.images.split(',').map(i => i.trim()).filter(i => i)
          : []
      };

      if (newArtifact.cave && newArtifact.cave.trim() !== "") {
        artifactData.cave = newArtifact.cave;
      }
      
      console.log("Sending artifact data:", artifactData);
      
      const response = await axios.post(
        "http://localhost:4000/api/artifacts", 
        artifactData
      );
      console.log("Response:", response.data);
  
      setNewArtifact({ title: "", type: "", era: "", description: "", location: "", images: "", conservationStatus: "", cave: "" });
      fetchArtifacts();
      setMessage({text: 'Artifact created successfully', type: 'success'});
    } catch (error) {
      console.error("Error creating artifact:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        setMessage({
          text: `Error creating artifact: ${error.response.data?.message || error.response.data?.error || error.message}`, 
          type: 'error'
        });
      } else {
        setMessage({text: `Error creating artifact: ${error.message}`, type: 'error'});
      }
    }
    setIsLoading(false);
  };
  


  // edit artifact
  const handleEditArtifact =  (artifact) => {
    
    setEditingArtifact({
      ...artifact,
      images: artifact.images.join(', ')
    });
  };

  const handleUpdateArtifact = async (e) => {
    e.preventDefault();
    try{
      setIsLoading(true);
      const updatedData ={
        ...editingArtifact,
        images: editingArtifact.images.split(',').map(i => i.trim())
      }
      await axios.put(`http://localhost:4000/api/artifacts/${editingArtifact._id}`, updatedData);
      setEditingArtifact(null);
      fetchArtifacts();
      setMessage({text: 'Artifact updated successfully', type: 'success'});
    } catch (error) {
      console.error("Error updating artifact:", error);
      setMessage({text: 'Error updating artifact', type: 'error'});
    }
    setIsLoading(false);
  };

  // delete artifact
  const handleDeleteArtifact = async (id) => {
    if(!window.confirm("Are you sure you want to delete this artifact?")) return;
    try{
      setIsLoading(true);
      await axios.delete(`http://localhost:4000/api/artifacts/${id}`);
      setArtifacts(prev=> prev.filter(artifact => artifact._id !== id));
      setMessage({text: 'Artifact deleted successfully', type: 'success'});
    } catch (error) {
      console.error("Error deleting artifact:", error);
      setMessage({text: 'Error deleting artifact', type: 'error'});
    }
    setIsLoading(false);
  };

  // cave handlers
  const handleCreateCave = async (e) => {
    e.preventDefault();
    try{
      setIsLoading(true);
      await axios.post("http://localhost:4000/api/caves", newCave);
      setNewCave({ name: "", creationPeriod: "", architecturalFeatures: "", significance: "" });
      fetchCaves();
      setMessage({text: 'Cave created successfully', type: 'success'});
    } catch (error) {
      console.error("Error creating cave:", error);
      setMessage({text: 'Error creating cave', type: 'error'});
    }
    setIsLoading(false);
  };

  // edit cave
  const handleEditCave = (cave) => {
    setEditingCave(cave);
  }

  // update cave
  const handleUpdateCave = async (e) => {
    e.preventDefault();
    try{
      setIsLoading(true);
      await axios.put(`http://localhost:4000/api/caves/${editingCave._id}`, editingCave);
      setEditingCave(null);
      fetchCaves();
      setMessage({text: 'Cave updated successfully', type: 'success'});
    } catch (error) {
      console.error("Error updating cave:", error);
      setMessage({text: 'Error updating cave', type: 'error'});
    }
    setIsLoading(false);
  }

  // delete cave
  const handleDeleteCave = async (id) => {
    if(!window.confirm("Are you sure you want to delete this cave?")) return;
    try{
      setIsLoading(true);
      await axios.delete(`http://localhost:4000/api/caves/${id}`);
      setCaves(prev => prev.filter(item=> item._id !== id));
      setMessage({text: 'Cave deleted successfully', type: 'success'});
    } catch (error) {
      console.error("Error deleting cave:", error);
      setMessage({text: 'Error deleting cave', type: 'error'});
    }
    setIsLoading(false);
  };

  // Access control
  if (role !== "admin") {
    return (
      <>
        <Navbar />
        <div className="access-denied">
          <h2>Access Denied</h2>
          <p>You must be an administrator to view this page.</p>
          <Link to="/" className="back-btn">Back to Home</Link>
        </div>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Navbar />
      <div className="admin-panel">
        <h2>Admin Dashboard</h2>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
            <button onClick={() => setMessage({text: '', type: ''})}>x</button>
          </div>
        )}


        <div className="admin-tabs">
          <button 
            className={tab === "artifacts" ? "active" : ""}
            onClick={() => setTab("artifacts")}
          >
            Artifacts
          </button>
          <button
            className={tab === "caves" ? "active" : ""}
            onClick={() => setTab("caves")}
          >
            Caves
          </button>
          <button
            className={tab === "exhibitions" ? "active" : ""}
            onClick={() => setTab("exhibitions")}
          >
            Exhibitions
          </button>
        </div>

        {isLoading && <div className="loading-spinner">Loading...</div>}


        {tab === "artifacts" && (
          <div className="tab-content">
            <h2>Artifacts Management</h2>
            
            {editingArtifact ? (
              <div className="edit-form">
                <h3>Edit Artifact</h3>
                <form onSubmit={handleUpdateArtifact}>
                  <div className="form-group">
                    <label>Title:</label>
                    <input 
                      type="text" 
                      value={editingArtifact.title} 
                      onChange={(e) => setEditingArtifact({...editingArtifact, title: e.target.value})}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Type:</label>
                    <input 
                      type="text" 
                      value={editingArtifact.type || ''} 
                      onChange={(e) => setEditingArtifact({...editingArtifact, type: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Era:</label>
                    <input 
                      type="text" 
                      value={editingArtifact.era || ''} 
                      onChange={(e) => setEditingArtifact({...editingArtifact, era: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Location:</label>
                    <input 
                      type="text" 
                      value={editingArtifact.location || ''} 
                      onChange={(e) => setEditingArtifact({...editingArtifact, location: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Images (comma separated URLs):</label>
                    <input 
                      type="text" 
                      value={editingArtifact.images || ''} 
                      onChange={(e) => setEditingArtifact({...editingArtifact, images: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Conservation Status:</label>
                    <input 
                      type="text" 
                      value={editingArtifact.conservationStatus || ''} 
                      onChange={(e) => setEditingArtifact({...editingArtifact, conservationStatus: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Associated Cave:</label>
                    <select 
                      value={editingArtifact.cave || ''} 
                      onChange={(e) => setEditingArtifact({...editingArtifact, cave: e.target.value})}
                    >
                      <option value="">None</option>
                      {caves.map(cave => (
                        <option key={cave._id} value={cave._id}>{cave.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Description:</label>
                    <textarea 
                      value={editingArtifact.description || ''} 
                      onChange={(e) => setEditingArtifact({...editingArtifact, description: e.target.value})}
                      rows="4"
                    />
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
                    <input 
                      type="text" 
                      value={newArtifact.title} 
                      onChange={(e) => setNewArtifact({...newArtifact, title: e.target.value})}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Type:</label>
                    <input 
                      type="text" 
                      value={newArtifact.type} 
                      onChange={(e) => setNewArtifact({...newArtifact, type: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Era:</label>
                    <input 
                      type="text" 
                      value={newArtifact.era} 
                      onChange={(e) => setNewArtifact({...newArtifact, era: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Location:</label>
                    <input 
                      type="text" 
                      value={newArtifact.location} 
                      onChange={(e) => setNewArtifact({...newArtifact, location: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Images (comma separated URLs):</label>
                    <input 
                      type="text" 
                      value={newArtifact.images} 
                      onChange={(e) => setNewArtifact({...newArtifact, images: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Conservation Status:</label>
                    <input 
                      type="text" 
                      value={newArtifact.conservationStatus} 
                      onChange={(e) => setNewArtifact({...newArtifact, conservationStatus: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Associated Cave:</label>
                    <select 
                      value={newArtifact.cave} 
                      onChange={(e) => setNewArtifact({...newArtifact, cave: e.target.value})}
                    >
                      <option value="">None</option>
                      {caves.map(cave => (
                        <option key={cave._id} value={cave._id}>{cave.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Description:</label>
                    <textarea 
                      value={newArtifact.description} 
                      onChange={(e) => setNewArtifact({...newArtifact, description: e.target.value})}
                      rows="4"
                    />
                  </div>
                  <button type="submit" className="create-btn">Create Artifact</button>
                </form>
              </div>
            )}
            
            <div className="data-list">
              <h3>Artifacts List ({artifacts.length})</h3>
              
              {artifacts.length === 0 ? (
                <p>No artifacts found.</p>
              ) : (
                <div className="data-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Era</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {artifacts.map(artifact => (
                        <tr key={artifact._id}>
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
        )}

        {tab === "caves" && (
          <div className="tab-content">
            <h2>Caves Management</h2>
            
            {editingCave ? (
              <div className="edit-form">
                <h3>Edit Cave</h3>
                <form onSubmit={handleUpdateCave}>
                  <div className="form-group">
                    <label>Name:</label>
                    <input 
                      type="text" 
                      value={editingCave.name} 
                      onChange={(e) => setEditingCave({...editingCave, name: e.target.value})}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Creation Period:</label>
                    <input 
                      type="text" 
                      value={editingCave.creationPeriod || ''} 
                      onChange={(e) => setEditingCave({...editingCave, creationPeriod: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Architectural Features:</label>
                    <textarea 
                      value={editingCave.architecturalFeatures || ''} 
                      onChange={(e) => setEditingCave({...editingCave, architecturalFeatures: e.target.value})}
                      rows="3"
                    />
                  </div>
                  <div className="form-group">
                    <label>Cultural Significance:</label>
                    <textarea 
                      value={editingCave.significance || ''} 
                      onChange={(e) => setEditingCave({...editingCave, significance: e.target.value})}
                      rows="4"
                    />
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
                    <input 
                      type="text" 
                      value={newCave.name} 
                      onChange={(e) => setNewCave({...newCave, name: e.target.value})}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Creation Period:</label>
                    <input 
                      type="text" 
                      value={newCave.creationPeriod} 
                      onChange={(e) => setNewCave({...newCave, creationPeriod: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Architectural Features:</label>
                    <textarea 
                      value={newCave.architecturalFeatures} 
                      onChange={(e) => setNewCave({...newCave, architecturalFeatures: e.target.value})}
                      rows="3"
                    />
                  </div>
                  <div className="form-group">
                    <label>Cultural Significance:</label>
                    <textarea 
                      value={newCave.significance} 
                      onChange={(e) => setNewCave({...newCave, significance: e.target.value})}
                      rows="4"
                    />
                  </div>
                  <button type="submit" className="create-btn">Create Cave</button>
                </form>
              </div>
            )}
            
            <div className="data-list">
              <h3>Caves List ({caves.length})</h3>
              
              {caves.length === 0 ? (
                <p>No caves found.</p>
              ) : (
                <div className="data-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Creation Period</th>
                        <th>Artifacts</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {caves.map(cave => (
                        <tr key={cave._id}>
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
        )}

        {tab === "exhibitions" && (
          <div className="tab-content">
            <h2>Exhibitions Management</h2>
            <p>Exhibition management functionality will be implemented soon.</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AdminPanel;