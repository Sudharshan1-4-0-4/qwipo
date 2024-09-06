import React, { useState, useEffect } from 'react';

const CustomerForm = ({ onAddOrUpdateCustomer, selectedCustomer, clearSelectedCustomer }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    address1: '',
    address2: '',
  });

  const [error, setError] = useState('');

  
  useEffect(() => {
    if (selectedCustomer) {
      setFormData(selectedCustomer);
    } else {
      setFormData({
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        address1: '',
        address2: '',
      });
    }
  }, [selectedCustomer]);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (!formData.first_name || !formData.last_name || !formData.phone || !formData.email || !formData.address1) {
      setError('Please fill out all required fields');
      return;
    }

    if (formData.phone.length !== 10) {
      console.log(formData.phone.length);
      setError('Phone number must be 10 digits');
      return;
    }

    onAddOrUpdateCustomer(formData); 
   
    setError('');
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>First Name</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Address 1</label>
        <input
          type="text"
          name="address1"
          value={formData.address1}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Address 2</label>
        <input
          type="text"
          name="address2"
          value={formData.address2}
          onChange={handleChange}
        />
      </div>
      <button type="submit">
        {selectedCustomer ? 'Update Customer' : 'Add Customer'}
      </button>
      {selectedCustomer && (
        <button type="button" onClick={clearSelectedCustomer}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default CustomerForm;
