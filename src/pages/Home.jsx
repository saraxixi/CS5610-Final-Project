import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/Home.css";


const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <p>Welcome to the home page!</p>
      </div>
    </>
  );
}

export default Home;