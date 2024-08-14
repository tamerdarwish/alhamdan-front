

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