const Portfolio = ({ portfolio }) => {
    return (
      <div className="portfolio">
        <h3>Your Portfolio</h3>
        {portfolio.length === 0 ? (
          <p>No stocks purchased yet.</p>
        ) : (
          <ul>
            {portfolio.map((stock, idx) => (
              <li key={idx}>
                {stock.symbol} – {stock.quantity} share(s) @ ${stock.price.toFixed(2)} each
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default Portfolio;
  