import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

import yunduo from "../assets/images/cloud.png";
import background from "../assets/images/background.jpg";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState(""); // nickname
  const [email, setEmail] = useState(""); // email
  const [password, setPassword] = useState(""); // password
  const [role, setRole] = useState("user"); // role
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/users", {
        username,
        email,
        password,
        role,
      });
      alert("Registration successful! Please log in.");
      setIsLogin(true);
    } catch (err) {
      console.error(err);
      alert("Registration failed. Please check your information.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/users/login", {
        email,
        password,
      });

      // save user info to local storage
      localStorage.setItem("userId", res.data.user.id);
      localStorage.setItem("userRole", res.data.user.role);

      alert("Login successful!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Login failed. Please check your email or password.");
    }
  };

  return (
    <div id="form_box" style={{ backgroundImage: `url(${background})` }}>
      <img className="cloud" src={yunduo} alt="cloud" />

      <div className="form_list">
        <div className="form_title">
          <div className="tabs">
            <span
              className={isLogin ? "active" : ""}
              onClick={() => setIsLogin(true)}
            >
              Login
            </span>
            <span
              className={!isLogin ? "active" : ""}
              onClick={() => setIsLogin(false)}
            >
              Register
            </span>
            <div className="active_bar" style={{ left: isLogin ? "0%" : "50%" }} />
          </div>
        </div>

        <ul>
          {isLogin ? (
            <form onSubmit={handleLogin}>
              <li className="list_in">
                <input
                  type="text"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </li>
              <li className="list_in">
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </li>
              <li className="submit">
                <button type="submit">LOGIN</button>
              </li>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <li className="list_in">
                <input
                  type="text"
                  placeholder="Nickname"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </li>
              <li className="list_in">
                <input
                  type="text"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </li>
              <li className="list_in">
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </li>
              <li className="list_in role_select">
                <label className={`role_option ${role === "user" ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={role === "user"}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  User
                </label>
                <label className={`role_option ${role === "admin" ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={role === "admin"}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  Admin
                </label>
              </li>
              <li className="submit">
                <button type="submit">REGISTER</button>
              </li>
            </form>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Login;
