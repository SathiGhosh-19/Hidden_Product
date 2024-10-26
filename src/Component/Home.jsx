import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../Api/axios';
import './home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState({});

  useEffect(() => {
    fetchProducts().then((data) => setProducts(data));
  }, []);

  const handleCellClick = (index) => {
    setVisibleProducts((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const rows = 4;
  const cols = 5;

  return (
    <div className="home-container">
      <table className="product-table">
        <tbody>
          {Array.from({ length: rows }, (_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: cols }, (_, colIndex) => {
                const index = rowIndex * cols + colIndex;
                const product = products[index];
                const isVisible = visibleProducts[index];

                return (
                  <td key={colIndex} onClick={() => handleCellClick(index)}>
                    {isVisible && product ? (
                      <div className="product-cell">
                        <h2>{product.title}</h2>
                        <img src={product.image} alt={product.title} />
                      </div>
                    ) : (
                      <div className="hidden-cell" />
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
