import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaBox, FaTruck, FaUniversity } from "react-icons/fa"; // 使用 FontAwesome 图标

import "../styles/Artifacts.css"; // 导入样式文件

const Artifacts = () => {
  return (
    <>
      <Navbar />

      <div className="artifact-banner">
        <div className="artifact-feature">
          <FaBox className="artifact-icon" />
          <p>Our postage charges include all duties</p>
        </div>
        <div className="artifact-feature">
          <FaTruck className="artifact-icon" />
          <p>Free UK standard delivery on orders over $100</p>
        </div>
        <div className="artifact-feature">
          <FaUniversity className="artifact-icon" />
          <p>Every purchase supports the Dunhuang Museum</p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Artifacts;
