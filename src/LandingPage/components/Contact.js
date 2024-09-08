import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    emailjs.send('service_4ebb9j4', 'template_jg7tpse', formData, 'eHUz8UN-G9gBYVHmE')
      .then((response) => {
        console.log('Success:', response);
        setStatus('Your message has been sent successfully!');
        setFormData({ name: '', email: '', message: '' }); // Clear the form
      })
      .catch((error) => {
        console.error('Error:', error);
        setStatus('Failed to send the message. Please try again.');
      });
  };

  return (
    <section id="contact-us" className="contact-us">
      <div className="contact-container">
        <h2 className="contact-title">إتصل بنا</h2>
        <div className="contact-content">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="إسمك الكامل"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="بريدك الإلكتروني"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                id="message"
                name="message"
                placeholder="اكتب لنا هنا .."
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-button">أرسل رسالتك</button>
            {status && <p className="status-message">{status}</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
