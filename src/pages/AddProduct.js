import React, { useState } from 'react';
import './AddProduct.css';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null); // State to hold the selected image
  const [successMessage, setSuccessMessage] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Save the selected image to state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create FormData to handle file uploads
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    if (image) {
      formData.append('image', image);
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        body: formData,
        headers: {
          // Content-Type should not be set when using FormData
        },
      });
  
      const responseBody = await response.json(); // Read response as JSON
      console.log('Response:', responseBody);
  
      if (response.ok) {
        setSuccessMessage('Product added successfully!');
        
        // Clear form fields and reload page after 2 seconds
        setTimeout(() => {
          setName('');
          setDescription('');
          setPrice('');
          setImage(null); // Clear the image file
          setSuccessMessage(''); // Clear the success message
          window.location.reload(); // Reload the page
        }, 1000); // 2 seconds to match the display duration
      } else {
        alert('There was an error adding the product!');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('There was an error adding the product!');
    }
  };
  
  return (
    <div className="add-product-container">
      <h2>Add a New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} required />
        </div>
        <button type="submit">Add Product</button>
      </form>
      {successMessage && (
        <p className="success-message">
          {successMessage}
        </p>
      )}
    </div>
  );
};

export default AddProduct;
