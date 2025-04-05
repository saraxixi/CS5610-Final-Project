import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/Profile.css"; // 记得创建这个文件来写样式

const Profile = () => {
  const userId = localStorage.getItem("userId");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    avatar: "",
  });
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (userId) {
      axios.get(`/api/users/${userId}`)
        .then(res => {
          const { username, email, avatar } = res.data;
          setFormData({ username, email, avatar });
        })
        .catch(err => console.error(err));

      axios.get(`/api/users/${userId}/favorites`)
        .then(res => {
          setFavorites(res.data);
        })
        .catch(err => console.error("Failed to load favorites", err));
    }
  }, [userId]);

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="user-info">
        <img
          src={formData.avatar || '/avatar-default-light.svg'}
          alt="avatar"
          className="avatar"
          onError={(e) => { e.target.src = '/avatar-default-light.svg'; }}
        />
          <h2>{formData.username}</h2>
          <p>{formData.email}</p>

          <button className="edit-btn">Edit Profile</button>
        </div>

        <hr className="divider" />

        <div className="favorites-section">
          <h3>My Favorite Collections</h3>
          <div className="favorites-grid">
            {favorites.length > 0 ? (
              favorites.map(item => (
                <div key={item._id} className="favorite-card">
                  <img src={item.image} alt={item.title} />
                  <p>{item.title}</p>
                </div>
              ))
            ) : (
              <p>You have no favorites yet.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
