// eventHandlers.js
import imageCompression from 'browser-image-compression';
import { fetchEventById, editEvent } from '../services/events-api';
import { uploadImageToAlbum, deleteImageFromAlbum, deleteSelectedImagesFromAlbum,togglePrintStatus } from '../services/images-api';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2'; // استيراد SweetAlert2
import 'sweetalert2/dist/sweetalert2.min.css'; // استيراد CSS الخاص بـ SweetAlert2



// Fetch event data by ID
export const fetchEvent = async (eventId, setEvent,setUpdatedEvent, setLoading) => {
  try {
    const eventData = await fetchEventById(eventId);
    if (Array.isArray(eventData.album)) {
      eventData.album = eventData.album.map(image => JSON.parse(image));
    }
    setEvent(eventData);
    setUpdatedEvent(eventData)
    if (typeof setLoading === 'function') {
      setLoading(false);
    }
    return eventData;

  } catch (error) {
    console.error('Failed to fetch event:', error);
    if (typeof setLoading === 'function') {
      setLoading(false);
    }
    Swal.fire({
      icon: 'error',  // تحديد نوع الأيقونة (خطأ)
      title: 'حدث خطأ!',
      text: 'حدث خطأ أثناء محاولة تحميل صفحة المناسبة . يرجى المحاولة مرة أخرى.',
      confirmButtonText: 'حسنًا',
      customClass: {
        title: 'swal2-title',   // فئات مخصصة للعنوان
        content: 'swal2-content',  // فئات مخصصة للنص
        confirmButton: 'swal2-confirm-button'  // فئات مخصصة للزر
      }
    });   }
};

//Download ZIP of selected images 
export const handleDownloadZip = (event, selectedImages) => {
  if (selectedImages.length === 0) {
    Swal.fire({
      icon: 'warning',  // تحديد نوع الأيقونة (خطأ)
      title: 'تنبيه!',
      text: 'ليس هنالك صور محددة للتحميل.',
      confirmButtonText: 'حسنًا',
      customClass: {
        title: 'swal2-title',   // فئات مخصصة للعنوان
        content: 'swal2-content',  // فئات مخصصة للنص
        confirmButton: 'swal2-confirm-button'  // فئات مخصصة للزر
      }
    });
        return;
  }
  

  const zip = new JSZip();
  const mainFolder = zip.folder(event.name);

  const fetchPromises = selectedImages.map(photo => {
    const { url } = photo;
    const imageName = url.split('/').pop();
    const fileExtension = 'JPEG';
    const fileName = `${imageName.replace(`.${fileExtension}`, '')}_copy_.${fileExtension}`;
    console.log(url);


    return fetch(url)

      .then(res => {
        if (!res.ok) {
          throw new Error(`Error fetching image: ${url}`);
        }
        return res.blob();
      })
      .then(blob => {
        // تأكد من استخدام الامتداد الصحيح للملف
        mainFolder.file(fileName, blob, { binary: true });
      });
  });

  Promise.all(fetchPromises).then(() => {
    zip.generateAsync({ type: 'blob' }).then(content => {
      saveAs(content, `${event.name}_photos.zip`);
    }).catch(error => {
      console.error('Error generating ZIP:', error);
    });
  }).catch(error => {
    console.error('Error fetching images:', error);
  });
};

//Change PrintStatus Of Image
export const handleTogglePrintStatus = async (eventId, imageId, currentStatus, setAlbum) => {
  try {
    const updatedImage = await togglePrintStatus(eventId, imageId, currentStatus);
    if (updatedImage) {
      // قم بتحديث حالة الصورة في الواجهة الأمامية بعد التحديث الناجح
      setAlbum(prevAlbum =>
        prevAlbum.map(image =>
          image.id === imageId ? { ...image, printStatus: !currentStatus } : image
        )
      );
    }
  } catch (error) {
    console.error('Failed to update print status:', error);
  }
};



// Refetch updated event data
export const refetchEvent = async (updatedEvent, setEvent, setSelectedImages) => {
  if (updatedEvent && updatedEvent.id) {
    try {
      const updatedEventData = await fetchEventById(updatedEvent.id);
      if (Array.isArray(updatedEventData.album)) {
        updatedEventData.album = updatedEventData.album.map(image => JSON.parse(image));
      }
      setEvent(updatedEventData);
      setSelectedImages([]);
    } catch (error) {
      console.error('Failed to fetch updated event:', error);
 Swal.fire({
        icon: 'error',  // تحديد نوع الأيقونة (خطأ)
        title: 'حدث خطأ!',
        text: 'حدث خطأ أثناء محاولة تحميل المناسبة بعد التحديث  . يرجى المحاولة مرة أخرى.',
        confirmButtonText: 'حسنًا',
        customClass: {
          title: 'swal2-title',   // فئات مخصصة للعنوان
          content: 'swal2-content',  // فئات مخصصة للنص
          confirmButton: 'swal2-confirm-button'  // فئات مخصصة للزر
        }
      });     }
  }
};

// Handle adding images to the event album
export const handleAddImages = async (e, eventId, eventData, setEvent, setUpdatedEvent, updateProgress) => {
  const files = e.target.files;
  if (!files || files.length === 0) {
    Swal.fire({
      icon: 'warning',  // تحديد نوع الأيقونة (خطأ)
      title: 'تنبيه!',
      text: 'يرجى اختيار صور.',
      confirmButtonText: 'حسنًا',
      customClass: {
        title: 'swal2-title',   // فئات مخصصة للعنوان
        content: 'swal2-content',  // فئات مخصصة للنص
        confirmButton: 'swal2-confirm-button'  // فئات مخصصة للزر
      }
    });    return;
  }

  const compressOptions = {
    maxSizeMB: 1,
    maxWidthOrHeight: 800,
    useWebWorker: true
  };

  let formData = new FormData();
  let totalFiles = files.length;
  let processedFiles = 0;

  // ضغط الصور وإضافتها إلى formData
  for (const file of files) {
    try {
      const compressedFile = await imageCompression(file, compressOptions);
      formData.append('images', compressedFile); // نضيف الصورة المضغوطة إلى formData
    } catch (error) {
      console.error('Error compressing image:', error);
      Swal.fire({
        icon: 'error',  // تحديد نوع الأيقونة (خطأ)
        title: 'حدث خطأ!',
        text: 'حدث خطأ أثناء محاولة ضغط الصور. يرجى المحاولة مرة أخرى.',
        confirmButtonText: 'حسنًا',
        customClass: {
          title: 'swal2-title',   // فئات مخصصة للعنوان
          content: 'swal2-content',  // فئات مخصصة للنص
          confirmButton: 'swal2-confirm-button'  // فئات مخصصة للزر
        }
      });     }
  }

  try {
    // رفع الصور إلى الألبوم عبر استدعاء API
    const { album: newAlbum } = await uploadImageToAlbum(eventId, formData);

    // التأكد من صحة الروابط المرفوعة
    const validImages = newAlbum.filter(img => img && img.url);

    // إذا تم رفع صور جديدة بنجاح
    if (validImages.length > 0) {
      const updatedAlbum = [...eventData.album, ...validImages];
      setEvent(prevEvent => ({
        ...prevEvent,
        album: updatedAlbum,
      }));
      setUpdatedEvent(prevEvent => ({
        ...prevEvent,
        album: updatedAlbum,
      }));
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    Swal.fire({
      icon: 'error',  // تحديد نوع الأيقونة (خطأ)
      title: 'حدث خطأ!',
      text: 'حدث خطأ أثناء محاولة رفع الصور. يرجى المحاولة مرة أخرى.',
      confirmButtonText: 'حسنًا',
      customClass: {
        title: 'swal2-title',   // فئات مخصصة للعنوان
        content: 'swal2-content',  // فئات مخصصة للنص
        confirmButton: 'swal2-confirm-button'  // فئات مخصصة للزر
      }
    });   } finally {
    processedFiles++;
    if (updateProgress) {
      updateProgress((processedFiles / totalFiles) * 100);
    }
  }
};

// دالة لتحويل الملف إلى Base64
const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file); // قراءة الملف كـ Base64
  });
};


// Handle selecting an image
export const handleSelectImage = (imageUrl, selectedImages, setSelectedImages) => {
  if (selectedImages.includes(imageUrl)) {
    setSelectedImages(selectedImages.filter((img) => img !== imageUrl));
  } else {
    setSelectedImages([...selectedImages, imageUrl]);
  }
};

// Handle deleting an individual image from the album
export const handleDeleteImage = async (imageId, eventId, eventData, setEvent, setUpdatedEvent, setLoading) => {
  if (!window.confirm('Are you sure you want to delete this image?')) return;

  const updatedAlbum = eventData.album.filter((img) => img.id !== imageId);

  // تحديث الحالة محليًا قبل طلب الحذف
  setEvent(prevEvent => ({
    ...prevEvent,
    album: updatedAlbum,
  }));
  setUpdatedEvent(prevEvent => ({
    ...prevEvent,
    album: updatedAlbum,
  }));

  try {
    // تنفيذ عملية الحذف من الخادم
    await deleteImageFromAlbum(eventId, imageId);

    // إعادة جلب البيانات المحدثة من الخادم باستخدام دالة fetchEvent
    await fetchEvent(eventId, setEvent, setUpdatedEvent, setLoading);
    
    // لا حاجة لتحديث الحالة مرة أخرى، حيث أن fetchEvent يقوم بذلك بالفعل
  } catch (error) {
    console.error('Error deleting image:', error);
    Swal.fire({
      icon: 'error',  // تحديد نوع الأيقونة (خطأ)
      title: 'حدث خطأ!',
      text: 'حدث خطأ أثناء محاولة حذف الصور. يرجى المحاولة مرة أخرى.',
      confirmButtonText: 'حسنًا',
      customClass: {
        title: 'swal2-title',   // فئات مخصصة للعنوان
        content: 'swal2-content',  // فئات مخصصة للنص
        confirmButton: 'swal2-confirm-button'  // فئات مخصصة للزر
      }
    });     
    // استعادة الصورة في حالة حدوث خطأ
    const imageToRestore = eventData.album.find(img => img.id === imageId);
    if (imageToRestore) {
      setEvent(prevEvent => ({
        ...prevEvent,
        album: [...prevEvent.album, imageToRestore],
      }));
      setUpdatedEvent(prevEvent => ({
        ...prevEvent,
        album: [...prevEvent.album, imageToRestore],
      }));
    }
  }
};

// Handle deleting selected images from the album
// دالة الحذف المعدلة
export const handleDeleteSelectedImages = async (eventId, selectedImages, eventData, setEvent, setUpdatedEvent, setSelectedImages, setLoading) => {
  if (!window.confirm('Are you sure you want to delete selected images?')) return;

  setLoading(true); // عرض التحميل أثناء الحذف
  const imagesToDelete = selectedImages.map(img => img.id);

  try {
    // تحديث الألبوم محلياً قبل إرسال الطلب
    const updatedAlbum = eventData.album.filter((img) => !imagesToDelete.includes(img.id));
    
    // تحديث الحالة لتفعيل إعادة العرض
    setEvent(prevEvent => ({
      ...prevEvent,
      album: updatedAlbum,
    }));
    
    setUpdatedEvent(prevEvent => ({
      ...prevEvent,
      album: updatedAlbum,
    }));
    
    // حذف الصور من الألبوم في السيرفر
    await deleteSelectedImagesFromAlbum(eventId, selectedImages);
    
    // إعادة تعيين الصور المحددة بعد الحذف
    setSelectedImages([]);
    
  } catch (error) {
    console.error('Error deleting images:', error);
    Swal.fire({
      icon: 'error',  // تحديد نوع الأيقونة (خطأ)
      title: 'حدث خطأ!',
      text: 'حدث خطأ أثناء محاولة حذف الصور. يرجى المحاولة مرة أخرى.',
      confirmButtonText: 'حسنًا',
      customClass: {
        title: 'swal2-title',   // فئات مخصصة للعنوان
        content: 'swal2-content',  // فئات مخصصة للنص
        confirmButton: 'swal2-confirm-button'  // فئات مخصصة للزر
      }
    }); 
    // في حالة حدوث خطأ، إعادة الصور المحذوفة
    setEvent(prevEvent => ({
      ...prevEvent,
      album: [...prevEvent.album, ...selectedImages],
    }));
    
    setUpdatedEvent(prevEvent => ({
      ...prevEvent,
      album: [...prevEvent.album, ...selectedImages],
    }));
  } finally {
    setLoading(false); // إيقاف التحميل بعد الحذف
  }
};


// Handle toggling edit mode
export const handleEditClick = (setIsEditing) => {
  setIsEditing(true);
};

// Handle cancelling edit mode
export const handleCancelEdit = (setIsEditing, eventData, setUpdatedEvent) => {
  setIsEditing(false);
  setUpdatedEvent(eventData);
};

// Handle form input changes
export const handleChange = (e, setUpdatedEvent) => {
  const { name, value } = e.target;
  setUpdatedEvent(prevEvent => ({
    ...prevEvent,
    [name]: value,
  }));
};

// Handle saving changes to the event
export const handleSaveChanges = async (eventId, updatedEvent, setEvent, setUpdatedEvent, setIsEditing, setLoading) => {
  try {
    const data = await editEvent(eventId, updatedEvent);
    setEvent(data);
    setUpdatedEvent(data);
    setIsEditing(false);
  } catch (error) {
    console.error('Error updating event:', error);
    Swal.fire({
      icon: 'error',  // تحديد نوع الأيقونة (خطأ)
      title: 'حدث خطأ!',
      text: 'حدث خطأ أثناء محاولة تعديل معلومات المناسبة. يرجى المحاولة مرة أخرى.',
      confirmButtonText: 'حسنًا',
      customClass: {
        title: 'swal2-title',   // فئات مخصصة للعنوان
        content: 'swal2-content',  // فئات مخصصة للنص
        confirmButton: 'swal2-confirm-button'  // فئات مخصصة للزر
      }
    });     setUpdatedEvent(prevEvent => prevEvent);
  } finally {
    setLoading(false);
  }
};

// Handle printing selected images
export const handlePrintSelected = (selectedImages) => {
  if (selectedImages.length === 0) {
    alert("No images selected for printing.");
    return;
  }

  const printWindow = window.open('', '', 'height=600,width=800');
  printWindow.document.write('<html><head><title>Print Images</title>');
  printWindow.document.write('<style>img { max-width: 100%; height: auto; margin-bottom: 20px; }</style>');
  printWindow.document.write('</head><body>');

  selectedImages.forEach(imgSrc => {
    printWindow.document.write(`<img src="${imgSrc}" />`);
  });

  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
};

// Handle selecting all images
export const handleSelectAllImages = (selectedImages, eventData, setSelectedImages) => {
  if (selectedImages.length === eventData.length) {
    setSelectedImages([]);
  } else {
    setSelectedImages(eventData);
  }
};
