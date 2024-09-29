import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';  // استيراد مكتبة SweetAlert2
import 'sweetalert2/dist/sweetalert2.min.css';  // استيراد CSS الخاص بـ SweetAlert2

export const useOrderManager = (cartItems, setCartItems) => {
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    // حساب المجموع الكلي
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);
    navigate('/order-confirmation', { state: { cartItems, totalPrice } });
  };

  const handleOrderSubmit = () => {
    // منطق إرسال الطلبية إلى الخادم
    Swal.fire({
      icon: 'success',  // تحديد نوع الأيقونة (نجاح)
      title: 'تم إرسال الطلب بنجاح!',
      text: 'شكراً لك، تم إرسال طلبك بنجاح.',
      confirmButtonText: 'حسنًا',
      customClass: {
        title: 'swal2-title',   // فئات مخصصة للعنوان
        content: 'swal2-content',  // فئات مخصصة للنص
        confirmButton: 'swal2-confirm-button'  // فئات مخصصة للزر
      }
    });

    // منطق إضافي بعد إرسال الطلبية
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
