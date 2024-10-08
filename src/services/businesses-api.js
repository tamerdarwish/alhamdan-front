// قاعدة URL للنقاط النهائية للـ API
const apiBaseURL = 'http://localhost:5005/api/businesses'; // عدل الـ URL حسب مكان الخادم الخاص بك

// الحصول على جميع المصالح التجارية مع إمكانية التصفية وفق الفئة
export const getBusinesses = async (category) => {
    try {
      const url = category ? `/?category=${category}` : '/'; // إضافة الفئة إلى الاستعلام إذا كانت موجودة
      const response = await fetch(`${apiBaseURL}${url}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching businesses:', error);
      return [];
    }
  };
  

// الحصول على جميع الفئات
export const getCategories = async () => {
  try {
    const response = await fetch(`${apiBaseURL}/categories`);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// إضافة مصلحة تجارية جديدة
export const createBusiness = async (businessData) => {
  try {
    const response = await fetch(`${apiBaseURL}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(businessData),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating business:', error);
    return null;
  }
};

// تعديل مصلحة تجارية
export const updateBusiness = async (id, businessData) => {
  try {
    const response = await fetch(`${apiBaseURL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(businessData),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating business:', error);
    return null;
  }
};

// حذف مصلحة تجارية
export const deleteBusiness = async (id) => {
  try {
    const response = await fetch(`${apiBaseURL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting business:', error);
    return null;
  }
};
