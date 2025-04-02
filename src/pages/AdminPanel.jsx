import React, { useState, useEffect }  from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
//import '../styles/AdminPanel.css';

const AdminPanel = () => {
  const role = localStorage.getItem("userRole");
  const [tab, setTab] = useState("users");

  // create artifact
  const [artifacts, setArtifacts] = useState([]);
  const [newArtifact, setNewArtifact] = useState({ title: "", type: "", era: "", description: "", location: "", images: "", conservationStatus: "" });

  const fetchArtifacts = async () => {
    const res = await axios.get("http://localhost:4000/api/artifacts");
    setArtifacts(res.data);
  };

  const handleCreateArtifact = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/api/artifacts", {
      ...newArtifact,
      images: newArtifact.images.split(',').map(i => i.trim())
    });
    setNewArtifact({ title: "", type: "", era: "", description: "", location: "", images: "", conservationStatus: "" });
    fetchArtifacts();
  };

    // create cave
    const [caves, setCaves] = useState([]);
    const [newCave, setNewCave] = useState({ name: "", creationPeriod: "", architecturalFeatures: "", significance: "" });
    const fetchCaves = async () => {
        const res = await axios.get("http://localhost:4000/api/caves");
        setCaves(res.data);
      };
    const handleCreateCave = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:4000/api/caves", newCave);
        setNewCave({ name: "", creationPeriod: "", architecturalFeatures: "", significance: "" });
        fetchCaves();
      };
    
    // load data
    useEffect(() => {
        if (role === "admin") {
          fetchArtifacts();
          fetchCaves();
        }
      }, []);

  if (role !== "admin") {
    return (
      <>
        <Navbar />
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Access Denied</h2>
          <p>You must be an administrator to view this page.</p>
        </div>
        <Footer />
      </>
    );
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
