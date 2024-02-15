import React, { useState } from 'react';
import './Buttons.css';
import UserForm from '../UserForm/UserForm';
import axios from 'axios'; // Import axios
const Buttons = () => {
  const [showUserForm, setShowUserForm] = useState(false);
  const downloadPdf = async () => {
    try {
      const endpoint = (localStorage.getItem("role") === "user") ? `?role=${localStorage.getItem("user_name")}`:"";
      const response = await axios.get('http://localhost:8080/generateReport'+endpoint, {
        responseType: 'blob', // Set the response type to 'blob' for file download
      });

      // Create a blob object from the response
      const blob = new Blob([response.data], { type: 'application/pdf' });

      // Create a URL for the blob data received
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;

      // Set the filename for the downloaded file
      link.setAttribute('download', 'complaints_report.pdf');

      // Append the link to the body
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Clean up after download
      link.parentNode.removeChild(link);
    } catch (error) {
      console.log('PDF generation failed', error);
    }
  };

  const handleAddUserClick = () => {
    setShowUserForm(true);
  };

  const handleCloseForm = () => {
    setShowUserForm(false);
  };

  return (
    <div className="twoButtons">
     
      <div className="buttons" onClick={downloadPdf}>Report</div>
    </div>
  );
};

export default Buttons;
