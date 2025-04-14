import React from "react";
import "../styles/CartCard.css";
import { FaTrash } from "react-icons/fa";

const CartCard = ({ item, onQuantityChange, onRemove }) => {
  const { images, title, price, quantity } = item;

  const handleQuantityChange = (e) => {
    const newQty = parseInt(e.target.value);
    if (newQty >= 1) {
      onQuantityChange(item, newQty);
    }
  };

  return (
    <div className="cart-card">
      <div className="cart-product">
        <img src={images} alt={title} className="cart-image" />
        <div className="cart-title">{title}</div>
        <div className="cart-price">${price.toFixed(2)}</div>
        <input
          type="number"
          min="1"
          className="cart-quantity"
          value={quantity}
          onChange={handleQuantityChange}
        />
        <div className="cart-subtotal">${(price * quantity).toFixed(2)}</div>
        <button className="cart-remove" onClick={() => onRemove(item)}>
          <FaTrash className="remove-icon" />
          <span>Remove</span>
        </button>
      </div>
    </div>
  );
};

export default CartCard;
