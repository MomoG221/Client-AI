import React, { useState } from 'react';

function JoinForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    servicePlan: '', 
    comments: '',
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
      const response = await fetch('http://localhost:8000/api/join', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          name: '',
          email: '',
          company: '',
          servicePlan: '',
          comments: '',
        });
        setSuccessMessage('Welcome aboard! You have successfully joined our services.');
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.error);
        alert('Submission failed. Please try again.');
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
        <label htmlFor="servicePlan">Select Service Plan</label>
        <select
          name="servicePlan"
          id="servicePlan"
          value={formData.servicePlan}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select a plan</option>
          <option value="basic">Basic</option>
          <option value="pro">Pro</option>
          <option value="enterprise">Enterprise</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="comments">Additional Comments</label>
        <textarea
          className="textarea"
          name="comments"
          id="comments"
          rows="4"
          value={formData.comments}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="submit-button">Join Now</button>

      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Processing your request ⏳</p>
        </div>
      )}
    </form>
  );
}

export default JoinForm;
