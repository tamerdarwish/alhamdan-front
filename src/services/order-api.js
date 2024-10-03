// order-api.js
import Swal from 'sweetalert2'; // استيراد SweetAlert2
import 'sweetalert2/dist/sweetalert2.min.css'; // استيراد CSS الخاص بـ SweetAlert2
const API_URL = `https://alhamdan-back.onrender.com/api/orders`;

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


export const sendOrder = async (cartItems, totalPrice, fullName, address, phoneNumber,deliveryOption, clearCart, navigate) => {
  try {
    const response = await fetch(`https://alhamdan-back.onrender.com/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cartItems,
        totalPrice,
        fullName,
        address,
        phoneNumber,
        deliveryOption
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send order');
    }

    const result = await response.json();
    console.log('Order sent successfully:', result);
    Swal.fire({
      icon: 'success',  // تحديد نوع الأيقونة (خطأ)
      title: 'ممتاز!',
      text: 'تم إرسال طلبك بنجاح.',
      confirmButtonText: 'حسنًا',
      customClass: {
        title: 'swal2-title',   // فئات مخصصة للعنوان
        content: 'swal2-content',  // فئات مخصصة للنص
        confirmButton: 'swal2-confirm-button'  // فئات مخصصة للزر
      }
    }); 
    // تصفير السلة بعد نجاح الطلب
    clearCart();

    // إعادة التوجيه إلى الصفحة الرئيسية أو صفحة أخرى بعد تصفير السلة
    navigate('/');
  } catch (error) {
    console.error('Error sending order:', error);
    Swal.fire({
      icon: 'error',  // تحديد نوع الأيقونة (خطأ)
      title: 'حدث خطأ!',
      text: 'حدث خطأ أثناء محاولة إرسال الطلب. يرجى المحاولة مرة أخرى.',
      confirmButtonText: 'حسنًا',
      customClass: {
        title: 'swal2-title',   // فئات مخصصة للعنوان
        content: 'swal2-content',  // فئات مخصصة للنص
        confirmButton: 'swal2-confirm-button'  // فئات مخصصة للزر
      }
    });   }
};