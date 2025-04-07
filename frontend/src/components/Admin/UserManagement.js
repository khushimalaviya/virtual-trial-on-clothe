import React from 'react';
import '../../styles/Admin/UserManagement.css';

const UserManagement = () => {
  const users = [
    { name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
    { name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'Inactive' },
    { name: 'Charlie Brown', email: 'charlie@example.com', role: 'Moderator', status: 'Active' },
  ];

  return (
    <div className="user-container">
      <div className="top-header">
        <h2>User Management</h2>
        <button className="add-btn">+ Add User</button>
      </div>

      <input type="text" className="search-input" placeholder="Search users..." />

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={idx}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td className={user.status === 'Active' ? 'active' : 'inactive'}>
                {user.status}
              </td>
              <td style={{ textAlign: 'right' }}>
                <button className="btn edit">Edit</button>
                <button className="btn delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;