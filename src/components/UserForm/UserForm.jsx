import React, { useState } from 'react';
import Axios from 'axios';

import { CSSTransition } from 'react-transition-group';
import './UserForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
const UserForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post('http://localhost:8080/adduser', {
        // Pass the form data in the request body
        user_name: e.target.username.value,
        user_email: e.target.email.value,
        user_pass: e.target.password.value,
        user_contact: e.target.contact.value,
      });
      console.log('User added successfully:', response.data);
      // You can handle success behavior here, such as showing a success message or redirecting the user
    } catch (error) {
      console.error('Error adding user:', error);
      // Handle error behavior here, such as showing an error message to the user
    }
    // After form submission, you can close the overlay if needed
    setShowForm(false);
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCancel = () => {
    setShowForm(false);
  };
  const downloadpdf= async()=>{
    try{
      const respose =await axios.post(`http://localhost:8080/generateReport`);
      console.log("pdf generated succesfullty"+" "+respose.data);
       
   }
   catch(error){
      console.log("pdf generation failed");
   }
  }
  return (
    <div>
      <button onClick={() => setShowForm(!showForm)} className="Add-button">
        Add User
      </button>
      <CSSTransition in={showForm} timeout={300} classNames="form" unmountOnExit>
        <div className="overlay">
          <div className="form-container">
                    <div className='head'>
                    <label>Add User Details</label>
                    </div>
                      
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required />
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
              <button type="submit" className="action-button" onClick={downloadpdf}>
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
