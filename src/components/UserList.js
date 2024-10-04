import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserList.css';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [currentUser, setCurrentUser] = useState({
        _id: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        address: ''
    });

    // Fetch users from the API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users');
                setUsers(response.data);
            } catch (error) {
                alert('Error fetching users');
            }
        };
        fetchUsers();
    }, []);

    // Handle delete user
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${id}`);
            setUsers(users.filter(user => user._id !== id));
        } catch (error) {
            alert('Error deleting user');
        }
    };

    // Handle edit button click, populate form with user data
    const handleEdit = (user) => {
        setEditMode(true);
        setCurrentUser(user);
    };

    // Handle form input changes for editing
    const handleChange = (e) => {
        setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
    };

    // Handle the form submission for editing the user
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/users/${currentUser._id}`, currentUser);
            setUsers(users.map(user => (user._id === currentUser._id ? currentUser : user)));
            setEditMode(false);
            alert('User updated successfully');
        } catch (error) {
            alert('Error updating user');
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">User List</h2>

            {/* Display User List */}
            <table className="table table-striped table-hover user-table">
                <thead className="thead-dark">
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id} className="user-row">
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.email}</td>
                            <td>{user.address}</td>
                            <td>
                                <button 
                                    className="btn btn-warning btn-sm mr-2"
                                    onClick={() => handleEdit(user)}
                                >
                                    Edit
                                </button>
                                <button 
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(user._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit User Form */}
            {editMode && (
                <div className="edit-form mt-5">
                    <h3>Edit User</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="firstName"
                                value={currentUser.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="lastName"
                                value={currentUser.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input
                                type="number"
                                className="form-control"
                                name="phoneNumber"
                                value={currentUser.phoneNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={currentUser.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input
                                type="text"
                                className="form-control"
                                name="address"
                                value={currentUser.address}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-success">Save Changes</button>
                        <button 
                            type="button" 
                            className="btn btn-secondary ml-2"
                            onClick={() => setEditMode(false)}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default UserList;
