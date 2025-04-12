import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/AdminPanel.css';
import ArtifactsPanel from '../components/ArtifactsPanel';
import MuralsPanel from '../components/MuralPanel';
import ExhibitionsPanel from '../components/ExhibitionsPanel';

const AdminPanel = () => {
  const role = localStorage.getItem("userRole");
  const [tab, setTab] = useState("artifacts");

  return (
    <>
      <Navbar />
      <div className="admin-panel">
        <h2>Admin Dashboard</h2>

        <div className="admin-tabs">
          <button
            className={tab === "artifacts" ? "active" : ""}
            onClick={() => setTab("artifacts")}
          >
            Artifacts
          </button>
          <button
            className={tab === "murals" ? "active" : ""}
            onClick={() => setTab("murals")}
          >
            Murals
          </button>
          <button
            className={tab === "exhibitions" ? "active" : ""}
            onClick={() => setTab("exhibitions")}
          >
            Exhibitions
          </button>
        </div>

        {tab === "artifacts" && <ArtifactsPanel />}
        {tab === "murals" && <MuralsPanel />}
        {tab === "exhibitions" && <ExhibitionsPanel />}
      </div>
      <Footer />
    </>
  );
};

export default AdminPanel;