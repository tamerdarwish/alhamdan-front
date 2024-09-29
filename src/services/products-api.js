
export const fetchProductById = async (id) => {
    try {
      const response = await fetch(`https://alhamdan-back-8.onrender.com/api/products/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  };
  

export const fetchProducts = async (currentPage, itemsPerPage, searchTerm) => {
  try {
    const response = await fetch(`https://alhamdan-back-8.onrender.com/api/products?page=${currentPage}&limit=${itemsPerPage}&search=${searchTerm}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};


export const addProduct = async (formData) => {
  try {
    const response = await fetch(`https://alhamdan-back-8.onrender.com/api/products`, {
      method: 'POST',
      body: formData,
      headers: {
        // Content-Type should not be set when using FormData
      },
    });

    const responseBody = await response.json(); // تحويل الاستجابة إلى JSON
    console.log('Response:', responseBody);

    if (!response.ok) {
      throw new Error('Error adding product');
    }

    return responseBody; // إرجاع البيانات عند النجاح
  } catch (error) {
    console.error('Error adding product:', error);
    throw error; // إرجاع الخطأ للمكون الذي يستدعي هذه الدالة
  }
};

// ملف api.js

export const adminFetchProducts = async (searchTerm) => {
  try {
    const response = await fetch(`https://alhamdan-back-8.onrender.com/api/products?search=${searchTerm}`);
    const data = await response.json();
    return data.products; // إرجاع المنتجات
  } catch (error) {
    console.error('Error fetching products:', error);
    return []; // إرجاع مصفوفة فارغة في حال حدوث خطأ
  }
};


// ملف api.js



export const updateProduct = async (id, formData) => {
  const response = await fetch(`https://alhamdan-back-8.onrender.com/api/products/${id}`, {
    method: 'PUT',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to update product');
  }

  return response; // إرجاع الاستجابة في حال نجاح العملية
};


