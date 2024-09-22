// src/utils/adminAuth.js

export const checkAdminAuth = () => {
    // افحص إذا كان هناك رمز توثيق في localStorage
    const adminToken = localStorage.getItem('adminToken');
    
    // إذا كان الرمز موجوداً، اعتبر الأدمن قد سجل الدخول
    if (adminToken) {
      return true;
    } else {
      return false;
    }
  };
  