import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/styles.css';  // Ensure this points correctly to your CSS

const PaymentPage = () => {
  const { state } = useLocation();
  const { stock, quantity } = state || {};

  const handlePayment = () => {
    alert(`Payment processed successfully for ${quantity} shares of ${stock.name}`);
  };

  if (!stock) {
    return <p>No stock selected. Please go back and select a stock.</p>;
  }

  return (
    <div className="payment-container">
      <h2>Payment</h2>
      <div>
        <h3>{stock.name} ({stock.symbol})</h3>
        <p>Price per share: ${stock.price}</p>
        <p>Quantity: {quantity}</p>
        <p>Total: ${(stock.price * quantity).toFixed(2)}</p>
        <button className="payment-button" onClick={handlePayment}>Pay Now</button>
      </div>
    </div>
  );
};

export default PaymentPage;
