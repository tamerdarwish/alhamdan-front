// components/Contact.js
import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact-us" className="contact-us">
      <div className="contact-container">
        <h2 className="contact-title">Contact Us</h2>
        <div className="contact-content">
          <div className="contact-info">
            <p><strong>Address:</strong> 123 Wedding St, Photography City</p>
            <p><strong>Email:</strong> contact@studio.com</p>
            <p><strong>Phone:</strong> +123 456 7890</p>
          </div>
          <form className="contact-form">
            <div className="form-group">
              <input type="text" id="name" name="name" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" id="email" name="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <textarea id="message" name="message" placeholder="Your Message" rows="5" required></textarea>
            </div>
            <button type="submit" className="submit-button">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
