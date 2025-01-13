

//GET All Events 
    export const fetchEvents = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/api/events`);
        const data = await response.json();
        return data.data
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }

}

//GET Event By ID 
export const fetchEventById = async (eventId) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_SERVER}/api/events/${eventId}`);
    const data = await response.json();
    return data.data
  } catch (error) {
    console.error('Failed to fetch event:', error);
  }
}
//Delete Event By Id
export const handleDelete = async (id,onDelete) => {
  if (window.confirm('Are you sure you want to delete this event?')) {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER}/api/events/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      onDelete(id);
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event');
    }
  }
};

// api.js

export const verifyEventCode = async (eventCode) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_SERVER}/api/events/by-code/${eventCode}`);
    if (!response.ok) {
      throw new Error('Event not found or error fetching event');
    }
    const data = await response.json();
    return data.data.id; // افترض أن الـ API يعيد معرّف المناسبة في الحقل `id`
  } catch (error) {
    console.error('Error verifying event code:', error);
    return null;
  }
};


export const editEvent = async (eventId,updatedEvent) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_SERVER}/api/events/${eventId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEvent),
    });

    if (!response.ok) {
      throw new Error('Failed to update event');
    }

    const data = await response.json();
    return data.data
  } catch (error) {
    console.error('Failed to fetch event:', error);
  }
}






export const checkAccessCode = async (code) => {
  // تحقق في قاعدة البيانات ما إذا كان الكود مستخدمًا مسبقًا
  const response = await fetch(`${process.env.REACT_APP_SERVER}/api/events/check-code/${code}`);
  const data = await response.json();
  return data.exists; // ترجع true إذا كان الكود موجودًا مسبقًا
};



