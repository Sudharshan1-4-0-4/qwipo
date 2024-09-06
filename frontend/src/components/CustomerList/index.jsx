import React from 'react';

const CustomerList = ({ customers, onEditCustomer, onDeleteCustomer }) => {
  const handleEditClick = (customer) => {
    onEditCustomer(customer);
  };

  const handleDeleteClick = (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      onDeleteCustomer(customerId);
    }
  };

  return (
    <div>
      <h2>Customer List</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address 1</th>
            <th>Address 2</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.first_name}</td>
              <td>{customer.last_name}</td>
              <td>{customer.phone}</td>
              <td>{customer.email}</td>
              <td>{customer.address1}</td>
              <td>{customer.address2}</td>
              <td>
                <button onClick={() => handleEditClick(customer)}>Edit</button>
                <button onClick={() => handleDeleteClick(customer.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
