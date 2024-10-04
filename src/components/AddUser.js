import React, { useState } from 'react';
import axios from 'axios';
import './AddUser.css';  

const AddUser = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        address: '',
    });

    const [errors, setErrors] = useState({});

    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    
    const validate = () => {
        const newErrors = {};
        const phonePattern = /^[0-9]{10}$/;
        const emailPattern = /\S+@\S+\.\S+/;

        if (!phonePattern.test(formData.phoneNumber)) {
            newErrors.phoneNumber = "Phone number must be exactly 10 digits";
        }

        if (!emailPattern.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        return newErrors;
    };

   
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await axios.post('https://userdetails-server.onrender.com/api/users', formData);
            alert('User added successfully');
            window.location.reload();
            setFormData({
                firstName: '',
                lastName: '',
                phoneNumber: '',
                email: '',
                address: '',
            });
            setErrors({});
        } catch (error) {
            alert('Error');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 user-form shadow-lg">
            <div className="form-group mb-3">
                <label>First Name</label>
                <input
                    className="form-control"
                    name="firstName"
                    placeholder="First Name"
                    onChange={handleChange}
                    value={formData.firstName}
                    required
                />
            </div>

            <div className="form-group mb-3">
                <label>Last Name</label>
                <input
                    className="form-control"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={handleChange}
                    value={formData.lastName}
                    required
                />
            </div>

            <div className="form-group mb-3">
                <label>Phone Number</label>
                <input
                    className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                    name="phoneNumber"
                    placeholder="Phone Number"
                    type="number"
                    onChange={handleChange}
                    value={formData.phoneNumber}
                    maxLength="10"
                    required
                />
                {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
            </div>

            <div className="form-group mb-3">
                <label>Email</label>
                <input
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={formData.email}
                    required
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="form-group mb-3">
                <label>Address</label>
                <input
                    className="form-control"
                    name="address"
                    placeholder="Address"
                    onChange={handleChange}
                    value={formData.address}
                    required
                />
            </div>

            <button type="submit" className="btn btn-primary submit-btn">
                Add User
            </button>
        </form>
    );
};

export default AddUser;
