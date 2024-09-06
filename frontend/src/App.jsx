// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import CustomerForm from './components/CustomerForm';
import CustomerList from './components/CustomerList';

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [message, setMessage] = useState('');

  
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('http://localhost:4001/user/');
      if (response.ok) {
        const data = await response.json();
        setCustomers(data);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Error fetching customers');
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
      setMessage('An error occurred while fetching customers');
    }
  };

  
  const handleAddCustomer = async (customerData) => {
   
    const data = {
      "first_name": customerData.first_name,
      "last_name":customerData.last_name,
      "phone":customerData.phone,
      "email":customerData.email,
      "address1":customerData.address1,
      "address2":customerData.address2
    }

    try {
      const response = await fetch('http://localhost:4001/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("connected");
        const newCustomer = await response.json();
        setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
        setMessage('Customer added successfully');
        alert("User Added Sucessfully...");
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Error adding customer');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while adding the customer');
    }
  };

  
  const handleUpdateCustomer = async (customerData) => {
    try {
      const response = await fetch(`http://localhost:4001/update/${customerData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });

      if (response.ok) {
        alert("updated sucessfully");
        const updatedCustomer = await response.json();
        setCustomers((prevCustomers) =>
          prevCustomers.map((c) =>
            c.id === updatedCustomer.id ? updatedCustomer : c
          )
        );
        setMessage('Customer updated successfully');
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Error updating customer');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while updating the customer');
    }
  };

  
  const handleAddOrUpdateCustomer = (customerData) => {
    if (selectedCustomer) {
      console.log("update checking");
      handleUpdateCustomer(customerData);
    } else {
      console.log("checking");
      console.log(customerData);
      handleAddCustomer(customerData);
    }
    setSelectedCustomer(null); 
  };

  
  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
  };

 
  const handleDeleteCustomer = async (customerId) => {
    try {
      const response = await fetch(`http://localhost:4001/user/${customerId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCustomers((prevCustomers) =>
          prevCustomers.filter((customer) => customer.id !== customerId)
        );
        // setMessage('Customer deleted successfully');
        alert("Customer deleted successfully");
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Error deleting customer');
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
      setMessage('An error occurred while deleting the customer');
    }
  };

  return (
    <div className="App">
      <h1>Customer Management System</h1>
      {message && <p>{message}</p>}
      <CustomerForm
        onAddOrUpdateCustomer={handleAddOrUpdateCustomer}
        selectedCustomer={selectedCustomer}
        clearSelectedCustomer={() => setSelectedCustomer(null)}
      />
      <CustomerList
        customers={customers}
        onEditCustomer={handleEditCustomer}
        onDeleteCustomer={handleDeleteCustomer}
      />
    </div>
  );
};

export default App;
