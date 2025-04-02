import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
//import '../styles/AdminPanel.css';

const AdminPanel = () => {
  const role = localStorage.getItem("userRole");

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
        <ul style={{ listStyle: 'none', padding: 0, fontSize: '18px' }}>
          <li style={{ margin: '10px 0' }}>
            <Link to="/admin/users">👤 Manage Users</Link>
          </li>
          <li style={{ margin: '10px 0' }}>
            <Link to="/admin/artifacts"> Manage Artifacts</Link>
          </li>
          <li style={{ margin: '10px 0' }}>
            <Link to="/admin/exhibitions"> Manage Exhibitions</Link>
          </li>
          <li style={{ margin: '10px 0' }}>
            <Link to="/admin/ai-review"> Moderate AI Contributions</Link>
          </li>
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default AdminPanel;
