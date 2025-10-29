import React, { useState } from "react";
import "./ContactSection.css";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-grid">
        <div className="contact-info">
          <h2>Get In Touch</h2>
          <p>
            Have questions or want to learn more about our services? We'd love
            to hear from you. Reach out to our team and we'll respond as soon as
            possible.
          </p>
          <div className="contact-methods">
            <div className="contact-method">
              <div className="contact-icon-box">📧</div>
              <div className="contact-method-info">
                <strong>Email</strong>
                <span>johnson@marinebiz.tv</span>
              </div>
            </div>
            <div className="contact-method">
              <div className="contact-icon-box">📞</div>
              <div className="contact-method-info">
                <strong>Phone</strong>
                <span>+91 9539000513</span>
              </div>
            </div>
          </div>
        </div>
        <div className="contact-form-wrap">
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-field">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-field">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-primary contact-submit-btn"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
