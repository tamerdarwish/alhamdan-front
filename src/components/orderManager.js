import { useNavigate } from 'react-router-dom';

export const useOrderManager = (cartItems, setCartItems) => {
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    // حساب المجموع الكلي
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);
    navigate('/order-confirmation', { state: { cartItems, totalPrice } });
  };

  const handleOrderSubmit = () => {
    // منطق إرسال الطلبية إلى الخادم
    alert('Your order has been submitted successfully!');
    // يمكنك هنا إضافة منطق لإعادة توجيه المستخدم إلى صفحة أخرى بعد إرسال الطلبية
  };

  const removeFromCart = (index) => {
    const newCartItems = cartItems.filter((item, i) => i !== index);
    setCartItems(newCartItems);
  };

  return {
    handlePlaceOrder,
    handleOrderSubmit,
    removeFromCart,
  };
};
