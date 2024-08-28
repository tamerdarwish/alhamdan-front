import React, { useState, useEffect } from 'react';
import './ProductList.css';
import ProductModal from './ProductModal';
import { Pagination } from 'react-bootstrap';
import Cart from './Cart';
import { useOrderManager } from './orderManager';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const itemsPerPage = 16;

  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem('cartdata');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const { handlePlaceOrder, removeFromCart } = useOrderManager(cartItems, setCartItems);

  const handleAddToCart = (product) => {
    const newCartItems = [...cartItems, product];
    setCartItems(newCartItems);
    localStorage.setItem('cartdata', JSON.stringify(newCartItems));
  };

  useEffect(() => {
    localStorage.setItem('cartdata', JSON.stringify(cartItems));
  }, [cartItems]);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products?page=${currentPage}&limit=${itemsPerPage}&search=${searchTerm}`);
        const data = await response.json();
        console.log('Fetched data:', data); // تحقق من البيانات المسترجعة
        setProducts(data.products);
        setTotalProducts(data.total); // تعيين العدد الإجمالي للمنتجات
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [currentPage, searchTerm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  const pageCount = Math.ceil(totalProducts / itemsPerPage);

  return (
    <div className="product-list">
      <Cart cartItems={cartItems} removeFromCart={removeFromCart} placeOrder={handlePlaceOrder} />

      <h2>Our Products</h2>
      
      <input
        type="text"
        placeholder="🔍 Search for products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar modern-search-bar"
      />

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card" onClick={() => openProductModal(product)}>
            <div className="product-image-wrapper">
              <img src={product.image_url} alt={product.name} className="product-image" />
            </div>
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      {pageCount > 1 && (
        <Pagination>
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
          {[...Array(pageCount).keys()].map(page => (
            <Pagination.Item
              key={page}
              active={page + 1 === currentPage}
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === pageCount} />
        </Pagination>
      )}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={closeProductModal}
          addToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

export default ProductList;
