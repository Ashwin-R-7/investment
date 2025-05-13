import React, { useEffect, useState } from 'react';

const MyPurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    const fetchPurchases = async () => {
      const response = await fetch('http://localhost/stock-app/view_purchases.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_email: userEmail })
      });

      const result = await response.json();
      if (result.status === 'success') {
        setPurchases(result.data);
      } else {
        alert('Error fetching purchases');
      }
    };

    fetchPurchases();
  }, [userEmail]);

  return (
    <div>
      <h2>My Purchased Stocks</h2>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price (Each)</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((stock, idx) => (
            <tr key={idx}>
              <td>{stock.stock_symbol}</td>
              <td>{stock.stock_name}</td>
              <td>{stock.quantity}</td>
              <td>${stock.price}</td>
              <td>{new Date(stock.purchase_time).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyPurchases;
