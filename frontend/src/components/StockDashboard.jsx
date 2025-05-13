import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import the useNavigate hook
import '../styles/styles.css';  // This assumes styles.css is now in src/styles/

const stockData = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 190.12, change: '+1.2%', sector: 'Technology', marketCap: '2.4T' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2850.50, change: '-0.8%', sector: 'Technology', marketCap: '1.9T' },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 720.30, change: '+3.1%', sector: 'Automotive', marketCap: '900B' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 320.22, change: '+0.5%', sector: 'Technology', marketCap: '2.2T' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 3450.10, change: '+2.0%', sector: 'E-commerce', marketCap: '1.6T' },
  { symbol: 'NFLX', name: 'Netflix Inc.', price: 410.77, change: '-1.3%', sector: 'Streaming', marketCap: '180B' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 730.50, change: '+4.5%', sector: 'Technology', marketCap: '1.2T' },
  { symbol: 'INTC', name: 'Intel Corp.', price: 52.30, change: '-2.1%', sector: 'Technology', marketCap: '230B' },
  { symbol: 'DIS', name: 'Walt Disney Co.', price: 160.45, change: '+0.8%', sector: 'Entertainment', marketCap: '300B' },
  { symbol: 'BA', name: 'Boeing Co.', price: 220.98, change: '+1.5%', sector: 'Aerospace', marketCap: '150B' },
  { symbol: 'PYPL', name: 'PayPal Holdings', price: 277.10, change: '-0.9%', sector: 'Fintech', marketCap: '320B' },
  { symbol: 'SHOP', name: 'Shopify Inc.', price: 1450.00, change: '+3.3%', sector: 'E-commerce', marketCap: '180B' },
  { symbol: 'TWTR', name: 'Twitter Inc.', price: 85.20, change: '-1.4%', sector: 'Social Media', marketCap: '40B' },
  { symbol: 'FB', name: 'Meta Platforms Inc.', price: 295.22, change: '+0.5%', sector: 'Social Media', marketCap: '780B' },
  { symbol: 'V', name: 'Visa Inc.', price: 235.90, change: '+1.1%', sector: 'Finance', marketCap: '550B' },
  { symbol: 'MA', name: 'Mastercard Inc.', price: 400.45, change: '-0.2%', sector: 'Finance', marketCap: '450B' },
];

const StockDashboard = () => {
  const [selectedStock, setSelectedStock] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("Welcome to the stock market");  // State for message
  const navigate = useNavigate();  // Hook to navigate to PaymentPage

  const handleBuy = () => {
    if (selectedStock) {
      // Navigate to PaymentPage with stock and quantity
      navigate('/payment', {
        state: { stock: selectedStock, quantity },
      });
    }
  };

  const handleSell = () => {
    if (selectedStock) {
      alert(`Selling ${quantity} shares of ${selectedStock.name}`);
      // Here you can add logic to handle the actual selling process
    }
  };

  return (
    <>
      {/* Display the message at the top of the dashboard */}
      <div className="dashboard-message">
        <p>{message}</p>
      </div>

      <div className="stock-grid">
        {stockData.map((stock, index) => (
          <div
            key={index}
            className="stock-card"
            onClick={() => setSelectedStock(stock)}
          >
            <h3>{stock.symbol}</h3>
            <p>{stock.name}</p>
            <div className="stock-hover-details">
              <p>Price: ${stock.price}</p>
              <p>Change: <span style={{ color: stock.change.startsWith('+') ? 'green' : 'red' }}>{stock.change}</span></p>
              <p>Sector: {stock.sector}</p>
              <p>Market Cap: {stock.marketCap}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedStock && (
        <div className="modal-backdrop" onClick={() => setSelectedStock(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedStock.name} ({selectedStock.symbol})</h2>
            <p>Price: ${selectedStock.price}</p>
            <p>Change: {selectedStock.change}</p>
            <p>Sector: {selectedStock.sector}</p>
            <p>Market Cap: {selectedStock.marketCap}</p>

            <label>Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            />

            <div className="modal-actions">
              <button onClick={handleBuy}>Buy</button>
              <button onClick={handleSell}>Sell</button>
              <button onClick={() => setSelectedStock(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StockDashboard;