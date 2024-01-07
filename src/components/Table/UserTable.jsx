import React, { useState ,useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit'; // Import the Edit icon from MUI
import DeleteIcon from '@mui/icons-material/Delete'; // Import the Delete icon from MUI
import VisibilityIcon from '@mui/icons-material/Visibility'; // Import the Visibility icon from MUI
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'; // Import the VisibilityOff icon from MUI
import './UserTable.css'; // Import your CSS file for styling
import axios from 'axios';
export default function UserTable({ initialUsers  }) {
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [users, setUsers] = useState(initialUsers || []);
 
  const handleEdit = (userId) => {
   
  };
  useEffect(() => {
    setUsers(initialUsers || []);
  }, [initialUsers]);


  const handleDelete = (userId) => {
    axios.delete('http://localhost:8080/delete/user/'+userId)
    .then((response) => {
      console.log(`User with ID ${userId} deleted successfully.`);
      // If deletion was successful, update the UI or fetch updated user list
      const updatedUsers = users.filter((user) => user.user_id !== userId);
        setUsers(updatedUsers);
    })
    .catch((error) => {
      console.error('Error deleting user:', error);
      // Handle error scenarios or display error messages
    });
  };

  const togglePasswordVisibility = (userId) => {
    setVisiblePasswords((prevState) => ({
      ...prevState,
      [userId]: !prevState[userId],
    }));
  };

  return (
    <div className="table-container">
      <TableContainer component={Paper} className="table-paper">
        <Table className="table" aria-label="caption table">
          <TableHead>
            <TableRow className='table-header-row'>
              <TableCell className="table-cell">User ID</TableCell>
              <TableCell className="table-cell" align="left">User Name</TableCell>
              <TableCell className="table-cell" align="left">Email</TableCell>
              <TableCell className="table-cell" align="left">Contact</TableCell>
              <TableCell className="table-cell" align="left">Password</TableCell>
              <TableCell className="table-cell" align="left">Modify</TableCell>
              <TableCell className="table-cell" align="left">Delete</TableCell>
              {/* New column for actions */}
              {/* Add other table headers for user details */}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.user_id} className="table-row">
                <TableCell component="th" scope="row" className="table-cell">
                  {user.user_id}
                </TableCell>
                <TableCell align="left" className="table-cell">{user.user_name}</TableCell>
                <TableCell align="left" className="table-cell">{user.user_email}</TableCell>
                <TableCell align="left" className="table-cell">{user.user_contact}</TableCell>
                <TableCell align="left" className="table-cell">
                  {visiblePasswords[user.user_id] ? (
                    user.user_pass
                  ) : (
                    <span>••••••••</span>
                  )}
                  <span
                    onClick={() => togglePasswordVisibility(user.user_id)}
                    className="eye-icon"
                  >
                    {visiblePasswords[user.user_id] ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </span>
                </TableCell>
                <TableCell align="left" className="table-cell">
                  <EditIcon onClick={() => handleEdit(user.user_id)} className="edit-icon" />
                </TableCell>
                <TableCell align="left" className="table-cell">
                  <DeleteIcon onClick={() => handleDelete(user.user_id)} className="delete-icon" />
                </TableCell>
                {/* Render other user details as needed */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
