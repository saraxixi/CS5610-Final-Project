import React, { useState, useEffect }  from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { text } from 'express';
//import '../styles/AdminPanel.css';

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
    try{
      setIsLoading(true);
      await axios.post("http://localhost:4000/api/artifacts", {
        ...newArtifact,
        images: newArtifact.images.split(',').map(i => i.trim())
      });

      setNewArtifact({ title: "", type: "", era: "", description: "", location: "", images: "", conservationStatus: "", cave: "" });
      fetchArtifacts();
      setMessage({text: 'Artifact created successfully', type: 'success'});
    } catch (error) {
      console.error("Error creating artifact:", error);
      setMessage({text: 'Error creating artifact', type: 'error'});
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
  }

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
  }

  return (
    <>
      <Navbar />
      <div className="admin-panel" style={{ padding: '2rem' }}>
        <h2>Admin Dashboard</h2>
        <div style={{ marginBottom: "1rem" }}>
          <button onClick={() => setTab("artifacts")}>📦 Manage Artifacts</button>
          <button onClick={() => setTab("caves")}>🏛️ Manage Caves</button>
        </div>


        {tab === "artifacts" && (
          <>
            <h3>Create New Artifact</h3>
            <form onSubmit={handleCreateArtifact}>
              <input type="text" placeholder="Title" value={newArtifact.title} onChange={e => setNewArtifact({ ...newArtifact, title: e.target.value })} required />
              <input type="text" placeholder="Type" value={newArtifact.type} onChange={e => setNewArtifact({ ...newArtifact, type: e.target.value })} />
              <input type="text" placeholder="Era" value={newArtifact.era} onChange={e => setNewArtifact({ ...newArtifact, era: e.target.value })} />
              <input type="text" placeholder="Location" value={newArtifact.location} onChange={e => setNewArtifact({ ...newArtifact, location: e.target.value })} />
              <input type="text" placeholder="Images (comma separated)" value={newArtifact.images} onChange={e => setNewArtifact({ ...newArtifact, images: e.target.value })} />
              <input type="text" placeholder="Conservation Status" value={newArtifact.conservationStatus} onChange={e => setNewArtifact({ ...newArtifact, conservationStatus: e.target.value })} />
              <textarea placeholder="Description" value={newArtifact.description} onChange={e => setNewArtifact({ ...newArtifact, description: e.target.value })} />
              <button type="submit">Create Artifact</button>
            </form>

            <h4>Artifact Count: {artifacts.length}</h4>
          </>
        )}

        {tab === "caves" && (
          <>
            <h3>Create New Cave</h3>
            <form onSubmit={handleCreateCave}>
              <input type="text" placeholder="Name" value={newCave.name} onChange={e => setNewCave({ ...newCave, name: e.target.value })} required />
              <input type="text" placeholder="Creation Period" value={newCave.creationPeriod} onChange={e => setNewCave({ ...newCave, creationPeriod: e.target.value })} />
              <input type="text" placeholder="Architectural Features" value={newCave.architecturalFeatures} onChange={e => setNewCave({ ...newCave, architecturalFeatures: e.target.value })} />
              <textarea placeholder="Cultural Significance" value={newCave.significance} onChange={e => setNewCave({ ...newCave, significance: e.target.value })} />
              <button type="submit">Create Cave</button>
            </form>

            <h4>Cave Count: {caves.length}</h4>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AdminPanel;
