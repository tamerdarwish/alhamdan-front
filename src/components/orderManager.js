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

  // الدالة الجديدة لتفريغ السلة
  const clearCart = async() => {
    setCartItems([]); // تعيين السلة كقائمة فارغة

     localStorage.removeItem('cartdata'); // إزالة السلة من localStorage


    console.log('Cart cleared and removed from localStorage');
    

  };

  return {
    handlePlaceOrder,
    handleOrderSubmit,
    removeFromCart,
    clearCart, // تضمين الدالة الجديدة في الدوال المُعادة
  };
};
