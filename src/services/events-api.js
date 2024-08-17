

//GET All Events 
    export const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events');
        const data = await response.json();
        return data
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
}

//GET Event By ID 
export const fetchEventById = async (eventId) => {
  try {
    const response = await fetch(`http://localhost:5000/api/events/${eventId}`);
    const data = await response.json();
    return data
  } catch (error) {
    console.error('Failed to fetch event:', error);
  }
}

export const editEvent = async (eventId,updatedEvent) => {
  try {
    const response = await fetch(`http://localhost:5000/api/events/${eventId}`, {
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
    return data
  } catch (error) {
    console.error('Failed to fetch event:', error);
  }
}


