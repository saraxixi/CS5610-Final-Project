import { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const userId = localStorage.getItem("userId");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:4000/api/users/${userId}`)
        .then(res => {
          setFormData({
            username: res.data.username,
            email: res.data.email,
            password: ""
          });
        })
        .catch(err => console.error(err));
    }
  }, [userId]);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/users/${userId}`, formData);
      alert("Profile updated!");
    } catch (err) {
      console.error(err);
      alert("Update failed.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Edit Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>New Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Profile;
