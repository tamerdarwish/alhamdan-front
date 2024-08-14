// src/components/OrdersList.js

import React, { useState, useEffect } from 'react';

const OrdersList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders');
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error('Failed to fetch orders', err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Orders List</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            {order.storeName} - {order.totalPrice}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersList;
