// order-api.js

const API_URL = 'http://localhost:5005/api/orders';

// جلب جميع الطلبات
export const fetchOrders = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching orders: ${error.message}`);
  }
};

// جلب تفاصيل طلبية معينة
export const fetchOrderDetails = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching order details: ${error.message}`);
  }
};

// تحديث حالة طلبية معينة
export const updateOrderStatus = async (id, status) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error('Failed to update order status');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error updating order status: ${error.message}`);
  }
};
