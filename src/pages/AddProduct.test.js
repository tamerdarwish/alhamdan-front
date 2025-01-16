import { render, fireEvent, waitFor } from '@testing-library/react';
import AddProduct from './AddProduct';
import { MemoryRouter } from 'react-router-dom';
import { addProduct } from '../services/products-api'; // استيراد الدالة المحاكاة


// محاكاة URL.createObjectURL في بيئة Jest
global.URL.createObjectURL = jest.fn(() => 'mocked-url');

// اختبار: عرض رسالة الخطأ عند إضافة منتج بدون اسم
test('displays an error message when adding a product without a name', async () => {
  const { getByLabelText, getByText, queryByText } = render(
    <MemoryRouter>
      <AddProduct />
    </MemoryRouter>
  );

  const nameInput = getByLabelText('إسم المنتج');
  const descriptionInput = getByLabelText('وصف المنتج');
  const priceInput = getByLabelText('سعر المنتج');
  const imageInput = getByLabelText('إضغط لاختيار صورة');
  const submitButton = getByText('إضافة المنتج');

  fireEvent.change(nameInput, { target: { value: '' } });
  fireEvent.change(descriptionInput, { target: { value: 'Test description' } });
  fireEvent.change(priceInput, { target: { value: '100' } });
  fireEvent.change(imageInput, { target: { files: [new File([''], 'test.jpg')] } });

  fireEvent.click(submitButton);

  await waitFor(() => {
    const errorMessage = queryByText('إسم المنتج هذا الحقل مطلوب.');
    expect(errorMessage).toBeInTheDocument();
  });
});

// اختبار: عرض رسالة الخطأ عند إضافة منتج بدون وصف
test('displays an error message when adding a product without a description', async () => {
  const { getByLabelText, getByText, queryByText } = render(
    <MemoryRouter>
      <AddProduct />
    </MemoryRouter>
  );

  const nameInput = getByLabelText('إسم المنتج');
  const descriptionInput = getByLabelText('وصف المنتج');
  const priceInput = getByLabelText('سعر المنتج');
  const imageInput = getByLabelText('إضغط لاختيار صورة');
  const submitButton = getByText('إضافة المنتج');

  fireEvent.change(nameInput, { target: { value: 'Test product' } });
  fireEvent.change(descriptionInput, { target: { value: '' } });
  fireEvent.change(priceInput, { target: { value: '100' } });
  fireEvent.change(imageInput, { target: { files: [new File([''], 'test.jpg')] } });

  fireEvent.click(submitButton);

  await waitFor(() => {
    const errorMessage = queryByText('وصف المنتج هذا الحقل مطلوب.');
    expect(errorMessage).toBeInTheDocument();
  });
});

// اختبار: عرض رسالة الخطأ عند إضافة منتج بدون سعر
test('displays an error message when adding a product without a price', async () => {
  const { getByLabelText, getByText, queryByText } = render(
    <MemoryRouter>
      <AddProduct />
    </MemoryRouter>
  );

  const nameInput = getByLabelText('إسم المنتج');
  const descriptionInput = getByLabelText('وصف المنتج');
  const priceInput = getByLabelText('سعر المنتج');
  const imageInput = getByLabelText('إضغط لاختيار صورة');
  const submitButton = getByText('إضافة المنتج');

  fireEvent.change(nameInput, { target: { value: 'Test product' } });
  fireEvent.change(descriptionInput, { target: { value: 'Test description' } });
  fireEvent.change(priceInput, { target: { value: '' } });
  fireEvent.change(imageInput, { target: { files: [new File([''], 'test.jpg')] } });

  fireEvent.click(submitButton);

  await waitFor(() => {
    const errorMessage = queryByText('سعر المنتج هذا الحقل مطلوب.');
    expect(errorMessage).toBeInTheDocument();
  });
});

// محاكاة دالة addProduct
jest.mock('../services/products-api', () => ({
    addProduct: jest.fn(() => Promise.resolve({ status: 200, message: 'Success' }))
  }));
  
  test('successfully adds a product with all fields', async () => {
    const { getByLabelText, getByText, queryByText } = render(
      <MemoryRouter>
        <AddProduct />
      </MemoryRouter>
    );
  
    const nameInput = getByLabelText('إسم المنتج');
    const descriptionInput = getByLabelText('وصف المنتج');
    const priceInput = getByLabelText('سعر المنتج');
    const imageInput = getByLabelText('إضغط لاختيار صورة');
    const submitButton = getByText('إضافة المنتج');
  
    // إدخال قيم البيانات
    fireEvent.change(nameInput, { target: { value: 'Test Product' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test description' } });
    fireEvent.change(priceInput, { target: { value: '100' } });
    fireEvent.change(imageInput, { target: { files: [new File([''], 'test.jpg')] } });
  
    fireEvent.click(submitButton);
  
    await waitFor(() => {
      // التحقق من رسالة النجاح
      const successMessage = queryByText('تم إضافة المنتج بنجاح!');
      expect(successMessage).toBeInTheDocument();
    });
  });

  test('should display an error message when adding a product without an image', async () => {
    const { getByLabelText, getByText, queryByText } = render(
      <MemoryRouter>
        <AddProduct />
      </MemoryRouter>
    );
  
    const nameInput = getByLabelText('إسم المنتج');
    const descriptionInput = getByLabelText('وصف المنتج');
    const priceInput = getByLabelText('سعر المنتج');
    const submitButton = getByText('إضافة المنتج');
  
    // إدخال القيم في الحقول
    fireEvent.change(nameInput, { target: { value: 'Test Product' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test description' } });
    fireEvent.change(priceInput, { target: { value: '100' } });
  
    // تقديم النموذج دون اختيار صورة
    fireEvent.click(submitButton);
  
    // التحقق من رسالة الخطأ لعدم اختيار صورة
    const errorMessage = queryByText('الصورة المختارة: هذا الحقل مطلوب.');
    expect(errorMessage).toBeInTheDocument();
  });

  
  jest.mock('../services/products-api', () => ({
    addProduct: jest.fn(() => Promise.resolve({ status: 200, message: 'Success' })),
  }));
  
  test('should successfully add a product with all fields filled', async () => {
    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <AddProduct />
      </MemoryRouter>
    );
  
    // ملء الحقول
    const nameInput = getByLabelText('إسم المنتج');
    const descriptionInput = getByLabelText('وصف المنتج');
    const priceInput = getByLabelText('سعر المنتج');
    const imageInput = getByLabelText('إضغط لاختيار صورة');
    const submitButton = getByText('إضافة المنتج');
  
    // إدخال البيانات
    fireEvent.change(nameInput, { target: { value: 'Test Product' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test description' } });
    fireEvent.change(priceInput, { target: { value: '100' } });
  
    // إضافة صورة
    const file = new File(['image'], 'test-image.jpg', { type: 'image/jpeg' });
    fireEvent.change(imageInput, { target: { files: [file] } });
  
    // إنشاء FormData لمحاكاة ما يتم إرساله إلى API
    const formData = new FormData();
    formData.append('name', 'Test Product');
    formData.append('description', 'Test description');
    formData.append('price', '100');
    formData.append('image', file);
  
    // محاكاة استدعاء addProduct
    jest.mock('../services/products-api', () => ({
      addProduct: jest.fn(() => Promise.resolve({ status: 200, message: 'Success' })),
    }));
  
    // إرسال النموذج
    fireEvent.click(submitButton);
  
    // الانتظار للتحقق من استدعاء الدالة addProduct
    await waitFor(() => {
      expect(addProduct).toHaveBeenCalledTimes(1); // تحقق من استدعاء addProduct مرة واحدة
      expect(addProduct).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Test Product',
          description: 'Test description',
          price: '100',
          image: expect.any(File), // تحقق من أن الصورة قد تم تمريرها
        })
      ); // التحقق من أن الكائن المرسل هو FormData ويحتوي على البيانات الصحيحة
    });
  });
  