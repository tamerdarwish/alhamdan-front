//GET All Audios 
export const fetchAudios = async () => {
    try {
      const response = await fetch(`http://26.206.131.69:5005/api/audios`);
      const data = await response.json();
      return data
    } catch (error) {
      console.error('Failed to audios:', error);
    }

}

//GET Audio By ID 
export const fetchAudioById = async (id) => {
    try {
      const response = await fetch(`http://26.206.131.69:5005/api/audios/${id}`);
      const data = await response.json();
      return data
    } catch (error) {
      console.error('Failed to audio:', error);
    }
  }

  //Delete Audio By Id
export const deleteAudioById = async (id) => {
    if (window.confirm('Are you sure you want to delete this audio?')) {
      try {
        const response = await fetch(`http://26.206.131.69:5005/api/audios/${id}`, {
          method: 'DELETE',
        });
  
        if (!response.ok) {
          throw new Error('Failed to delete audio');
        }
  
      } catch (error) {
        console.error('Error deleting audio:', error);
        alert('Failed to delete audio');
      }
    }
  };

  // إضافة صوت جديد
  export const addAudio = async (formData) => {
    try {
        // إنشاء كائن FormData جديد
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('url', formData.url);

        // إذا كان هناك صورة، أضفها إلى FormData
        if (formData.imageFile) {
            data.append('mainImage', formData.imageFile);
        }

        const response = await fetch(`http://26.206.131.69:5005/api/audios`, {
            method: 'POST',
            body: data,  // استخدم الكائن الجديد من FormData
        });

        if (!response.ok) {
            // إذا كانت هناك مشكلة في الاستجابة، إرجع رسالة مفيدة
            const errorData = await response.json();
            throw new Error(errorData.message || 'فشل في إضافة الصوت');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error adding audio:', error);
        // بدلاً من alert، يمكن إرجاع الخطأ ليتم التعامل معه في مكان آخر
        throw new Error(error.message || 'فشل في إضافة الصوت');
    }
};


  // تحديث الصوت
export const updateAudio = async (id, formData) => {
    try {
      const response = await fetch(`http://26.206.131.69:5005/api/audios/${id}`, {
        method: 'PUT', // استخدم PUT لتحديث البيانات
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update audio');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating audio:', error);
      alert('فشل في تحديث الصوت');
    }
};
