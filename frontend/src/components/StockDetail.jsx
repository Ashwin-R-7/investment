import { useState } from 'react';

const StockDetail = () => {
  const [quantity, setQuantity] = useState(0);
  const [ownedStocks, setOwnedStocks] = useState([
    { name: 'AAPL', quantity: 5, price: 190 },
    { name: 'GOOGL', quantity: 2, price: 2850 },
  ]);

  const handleBuy = () => {
    alert(`Buying ${quantity} shares`);
    // Add backend logic or payment navigation here
  };

  const handleSell = () => {
    alert(`Selling ${quantity} shares`);
    // Add backend logic here
  };

  return (
    <div className="stock-detail">
      <h2>Stock: Apple Inc. (AAPL)</h2>
      <p>Price: $190.00</p>
      <p>Change: +1.23% Today</p>
      <p>Market Cap: $3T</p>
      <p>Volume: 80M</p>

      <input
        type="number"
        min="1"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <div className="btn-group">
        <button onClick={handleBuy}>Buy</button>
        <button onClick={handleSell}>Sell</button>
      </div>

      <hr />

      <h3>Your Owned Stocks</h3>
      <ul className="stock-list">
        {ownedStocks.map((stock, i) => (
          <li key={i}>
            {stock.name} — {stock.quantity} shares @ ${stock.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockDetail;
