import React from 'react';
import { Link } from 'react-router';
import './../../Styles/Contact.css';

const Contact = () => {
  return (
    <>
      <div className="contact-header text-center">
        <p className="text-muted">
          <Link to='/'>Home</Link> / Contact Us
        </p>
        <h2>Contact Us</h2>
      </div>

      <div className="contact-container">
        <div className="contact-main">
          <div className="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31687.327872274047!2d80.57112309069885!3d6.900651008300454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae39b0de302a37b%3A0x6f7d8f7528cf0e2e!2sHatton!5e0!3m2!1sen!2slk!4v1749488206886!5m2!1sen!2slk" 
              allowFullScreen="" 
              loading="lazy"
              title="Location Map"
            ></iframe>
          </div>
          
          <div className="form-container">
            <div className="form-content">
              <h4>GET IN TOUCH WITH US</h4>
              <p className="form-intro">
                If you wish to directly reach us, please fill out the form below -
              </p>
              
              <form>
                <div className="form-group">
                  <label>Your Name</label>
                  <input type="text" placeholder="Enter your name" />
                </div>

                <div className="form-group">
                  <label>Your Email</label>
                  <input type="email" placeholder="Enter your email" />
                </div>

                <div className="form-group">
                  <label>Your Message (optional)</label>
                  <textarea rows="5" placeholder="Type your message here"></textarea>
                </div>

                <button type="submit" className="submit-btn">
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="contact-info">
          <div className="info-item">
            <div className="info-icon">
              <i className="bi bi-geo-alt-fill"></i>
            </div>
            <p>No.47,Pon Nagar,<br />Hatton.</p>
          </div>
          
          <div className="info-item">
            <div className="info-icon">
              <i className="bi bi-telephone-fill"></i>
            </div>
            <p>Call Us<br />(+94) 767-588-558</p>
          </div>
          
          <div className="info-item">
            <div className="info-icon">
              <i className="bi bi-envelope-fill"></i>
            </div>
            <p>Mail Us<br />demo@example.com</p>
          </div>
          
          <div className="info-item">
            <div className="info-icon">
              <i className="bi bi-clock-fill"></i>
            </div>
            <p>Open Time:<br />10.00AM - 6.00PM</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact;