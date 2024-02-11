import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import { CSSTransition } from 'react-transition-group';
import './UserForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const UserForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowForm(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleAddUserClick = (e) => {
    e.stopPropagation(); // Prevents the click from reaching the document and triggering handleClose
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); 
    try {
      const response = await Axios.post('http://localhost:8080/user/post', {
        // Pass the form data in the request body
        name: e.target.name.value,
        email: e.target.email.value,
        pass: e.target.password.value,
        contact: e.target.contact.value,
      });
      console.log('User added successfully:', response.data);
      // You can handle success behavior here, such as showing a success message or redirecting the user
    } catch (error) {
      console.error('Error adding user:', error);
      // Handle error behavior here, such as showing an error message to the user
    } finally {
      setIsSubmitting(false); // Reset isSubmitting after form submission
      setShowForm(false); // Close the form after submission
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div>
      <button onClick={handleAddUserClick} className="Add-button">
        Add User
      </button>
      <CSSTransition in={showForm} timeout={300} classNames="form" unmountOnExit>
        <div className="overlay" onClick={handleClose}>
          <div className="form-container" ref={formRef} onClick={(e) => e.stopPropagation()}>
            <div className='head'>
              <label>Add User Details</label>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <div className="eye-icon" >
                  <input type="email" id="email" name="email" required />
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <div className="password-input">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    required
                  />
                  <div className="eye-icon" onClick={togglePasswordVisibility}>
                    {showPassword ? (
                      <FontAwesomeIcon icon={faEye} />
                    ) : (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    )}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="contact">Contact:</label>
                <input type="text" id="contact" name="contact" required />
              </div>
              <button type="submit" className="action-button" disabled={isSubmitting}>
                Register
              </button>
              <button
                type="button"
                className="action-button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default UserForm;
