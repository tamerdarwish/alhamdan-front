import React from 'react';
import ProductCard from '../components/ProductCard';

const StorePage = () => {
  return (
    <div>
      <h1>Store</h1>
      <div>
        {/* List products here */}
        <ProductCard />
      </div>
    </div>
  );
};

export default StorePage;
