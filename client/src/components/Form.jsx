import React, { useState } from 'react';

function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

 const [loading, setLoading] = useState(false);
 const [successMessage, setSuccessMessage] = useState('');



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: '', email: '', company: '', message: '' });
          setSuccessMessage('Your request has been submitted successfully!');

      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.error);
        alert('There was an error submitting your form. Please try again.');
      }
    } catch (err) {
      console.error(err);
    } finally {
        setLoading(false);
        }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="company">Company</label>
        <input
          type="text"
          name="company"
          id="company"
          value={formData.company}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="message">What are you interested in?</label>
        <textarea
            className="textarea"
          name="message"
          id="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="submit-button">Submit</button>

      {successMessage && (
  <div className="success-message">
    {successMessage}
  </div>
)}

      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Analyzing your Request ⏳</p>
        </div>
      )}
    </form>
  );
}

export default Form;
