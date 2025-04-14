import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/Profile.css";
import CartCard from "../components/CartCard";

import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Profile = () => {
  const userId = localStorage.getItem("userId");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    avatar: "",
  });
  const [favorites, setFavorites] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (userId) {
      axios.get(`/api/users/${userId}`)
        .then(res => {
          const { username, email, avatar } = res.data;
          setFormData({ username, email, avatar });
          setPreview(avatar || "/avatar-default-light.svg");
        })
        .catch(err => console.error(err));

      axios.get(`/api/users/${userId}/favorites`)
        .then(res => {
          setFavorites(res.data);
        })
        .catch(err => console.error("Failed to load favorites", err));
    }
  }, [userId]);

  const handleRemove = async (item) => {
    try {
      await axios.delete(`/api/users/${userId}/favorites/${item._id}`);
      setFavorites((prev) => prev.filter(fav => fav._id !== item._id));
      alert("Removed from favorites.");
    } catch (err) {
      console.error("Remove failed:", err);
      alert("Failed to remove item.");
    }
  };
  
  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const avatarRef = ref(storage, `avatars/${Date.now()}-${file.name}`);
    await uploadBytes(avatarRef, file);

    const downloadURL = await getDownloadURL(avatarRef);
    setFormData(prev => ({ ...prev, avatar: downloadURL }));
    setPreview(downloadURL); // 立即显示预览

    // 更新数据库头像字段
    await axios.put(`/api/users/${userId}`, { avatar: downloadURL });
  };

  const handleSave = () => {
    axios.put(`/api/users/${userId}`, formData)
      .then(res => {
        alert("Profile updated!");
        setFormData(res.data);
        setPreview(res.data.avatar || "/avatar-default-light.svg");
        setShowModal(false);
      })
      .catch(err => {
        console.error(err);
        alert("Update failed.");
      });
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="user-info">
          <img
            src={preview || "/avatar-default-light.svg"}
            alt="avatar"
            className="avatar"
            onError={(e) => { e.target.src = "/avatar-default-light.svg"; }}
          />
          <h2>{formData.username}</h2>
          <p>{formData.email}</p>
          <button className="edit-btn" onClick={() => setShowModal(true)}>Edit Profile</button>
        </div>

        <hr className="divider" />

        <div className="favorites-section">
          <h3>My Favorite Collections</h3>
          <div className="favorites-grid">
            {favorites.length > 0 ? (
              favorites.map(item => (
                <CartCard
                key={item._id}
                item={{ ...item, quantity: 1 }}
                onQuantityChange={() => {}}
                onRemove={handleRemove}
              />
              ))
            ) : (
              <p>You have no favorites yet.</p>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Your Profile</h3>

            <img
              src={preview || "/avatar-default-light.svg"}
              alt="Preview"
              className="avatar-preview"
              onError={(e) => { e.target.src = "/avatar-default-light.svg"; }}
            />

            <input type="file" accept="image/*" onChange={handleAvatarUpload} />

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />

            <div className="modal-actions">
              <button className="save-btn" onClick={handleSave}>Save</button>
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
