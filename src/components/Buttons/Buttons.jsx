import React, { useState } from 'react';
import './Buttons.css';
import UserForm from '../UserForm/UserForm';

const Buttons = () => {
  const [showUserForm, setShowUserForm] = useState(false);

  const handleAddUserClick = () => {
    setShowUserForm(true);
  };

  const handleCloseForm = () => {
    setShowUserForm(false);
  };

  return (
    <div className="twoButtons">
      {/* <div className="buttons" onClick={handleAddUserClick}>
        Add User
        {showUserForm && (
          <div className="modal-overlay">
            <div className="modal">
              <span className="close" onClick={handleCloseForm}>&times;</span>
              <UserForm />
            </div>
          </div>
        )}
      </div> */}
      <div className="buttons">Report</div>
    </div>
  );
};

export default Buttons;
