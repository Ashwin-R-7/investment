import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

const StockList = () => {
  const [selectedStock, setSelectedStock] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleBuy = async (stock) => {
    const qty = parseInt(quantity);
    if (!qty || qty < 1) return;

    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      alert('Please log in to continue');
      return;
    }

    const payload = {
      user_email: userEmail,
      stock_symbol: stock.symbol,
      stock_name: stock.name,
      quantity: qty,
      price: stock.price,
    };

    // Send purchase request to backend
    const response = await fetch('http://localhost/stock-app/buy_stocks.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (result.status === 'success') {
      alert('Stock purchased successfully!');
      // You could redirect to another page (e.g., Portfolio) or update local state
    } else {
      alert('Error purchasing stock: ' + result.message);
    }

    // Close modal
    setSelectedStock(null);
  };

  return (
    <>
      <div className="stock-grid">
        {stockData.map((stock, index) => (
          <div
            className="stock-card"
            key={index}
            onClick={() => setSelectedStock(stock)}
          >
            <h3>{stock.symbol}</h3>
            <p>{stock.name}</p>
            <p>Price: ${stock.price.toFixed(2)}</p>
            <p style={{ color: stock.change.startsWith('+') ? 'lightgreen' : 'tomato' }}>
              {stock.change}
            </p>
          </div>
        ))}
      </div>

      {selectedStock && (
        <div className="modal-backdrop" onClick={() => setSelectedStock(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedStock.name} ({selectedStock.symbol})</h2>
            <p><strong>Price:</strong> ${selectedStock.price.toFixed(2)}</p>
            <p><strong>Change:</strong> {selectedStock.change}</p>
            <p><strong>Sector:</strong> {selectedStock.sector}</p>
            <p><strong>Market Cap:</strong> {selectedStock.marketCap}</p>

            <div className="modal-actions">
              <div className="quantity-container">
                <label htmlFor="quantity">Quantity: </label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                />
              </div>
              <button className="buy-button" onClick={() => handleBuy(selectedStock)}>Buy</button>
              <button className="sell-button" onClick={() => alert('Sell functionality to be implemented')}>Sell</button>
            </div>

            <button onClick={() => setSelectedStock(null)} className="close-button">Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default StockList;
