import React from "react";
import Navbar from "../components/Navbar";
import "../styles/PaymentSuccess.css";

const PaymentSuccess = () => {
  return (
    <>
      <Navbar />
      <div className="payment-success-container">
        <h1 className="payment-success-title">🎉 Payment Successful!</h1>
        <p className="payment-success-message">
          Thank you for your purchase. Your order has been processed.
        </p>
        <a href="/" className="payment-success-button">Return to Home</a>
      </div>
    </>
  );
};

export default PaymentSuccess;
