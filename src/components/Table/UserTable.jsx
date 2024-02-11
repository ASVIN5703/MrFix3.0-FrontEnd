import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
export default function UserTable({ initialUsers }) {
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [users, setUsers] = useState(initialUsers || []);
  const [editedUsers, setEditedUsers] = useState([]);

  useEffect(() => {
    setUsers(initialUsers || []);
    setEditedUsers([]); // Reset editedUsers when initialUsers change
  }, [initialUsers]);

  const handleEditChange = (userId, field, value) => {
    const updatedUsers = editedUsers.map((user) =>
      user.user_id === userId ? { ...user, [field]: value } : user
    );
    setEditedUsers(updatedUsers);
  };

  const toggleEditing = (userId) => {
    const updatedUsers = users.map((user) =>
      user.user_id === userId ? { ...user, editing: !user.editing } : user
    );
    setUsers(updatedUsers);
    if (!editedUsers.find((user) => user.user_id === userId)) {
      const userToEdit = users.find((user) => user.user_id === userId);
      setEditedUsers([...editedUsers, { ...userToEdit }]);
    }
  };

  const handlePatch = async (userId) => {
    try {
      const updatedUserData = editedUsers.find((user) => user.user_id === userId);
      console.log("before api"+updatedUserData.user_contact);
      const response = await axios.patch(`http://localhost:8080/${userId}`, {
        user_name: updatedUserData.user_name,
        user_pass:updatedUserData.user_pass,
        user_email: updatedUserData.user_email,
        user_contact:updatedUserData.user_contact,
        // Add other fields you want to update
      });
      console.log(`User with ID ${userId} updated successfully:`, response.data);
      // Update the user list to reflect changes
      const updatedUsers = users.map((user) =>
      user.user_id === userId ? { ...user, ...updatedUserData,editing: false } : user
    );
    setUsers(updatedUsers);
    } catch (error) {
      console.error(`Error updating user with ID ${userId}:`, error);
      // Handle error behavior here
    }
  };

  const handleDelete = (userId) => {
    axios
      .delete(`http://localhost:8080/delete/user/${userId}`)
      .then((response) => {
        console.log(`User with ID ${userId} deleted successfully.`);
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
            <TableRow className="table-header-row">
              <TableCell className="table-cell">User ID</TableCell>
              <TableCell className="table-cell" align="left">
                User Name
              </TableCell>
              <TableCell className="table-cell" align="left">
                Email
              </TableCell>
              <TableCell className="table-cell" align="left">
                Contact
              </TableCell>
              <TableCell className="table-cell" align="left">
                Password
              </TableCell>
              <TableCell className="table-cell" align="left">
                Modify
              </TableCell>
              <TableCell className="table-cell" align="left">
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.user_id} className="table-row">
                <TableCell component="th" scope="row" className="table-cell">
                  {user.user_id}
                </TableCell>
                <TableCell align="left" className="table-cell">
                  {user.editing ? (
                    <input
                      type="text"
                      value={editedUsers.find((u) => u.user_id === user.user_id)?.user_name || ''}
                      onChange={(e) => handleEditChange(user.user_id, 'user_name', e.target.value)}
                    />
                  ) : (
                    user.user_name
                  )}
                </TableCell>
                <TableCell align="left" className="table-cell">
                  {user.editing ? (
                    <input
                      type="text"
                      value={editedUsers.find((u) => u.user_id === user.user_id)?.user_email || ''}
                      onChange={(e) => handleEditChange(user.user_id, 'user_email', e.target.value)}
                    />
                  ) : (
                    user.user_email
                  )}
                </TableCell>
                <TableCell align="left" className="table-cell">
                  {user.editing ? (
                    <input
                      type="text"
                      value={editedUsers.find((u) => u.user_id === user.user_id)?.user_contact || ''}
                      onChange={(e) => handleEditChange(user.user_id, 'user_contact', e.target.value)}
                    />
                  ):(user.user_contact)}
                </TableCell>
                <TableCell align="left" className="table-cell">
                  {visiblePasswords[user.user_id] ? (
                    user.user_pass
                  ) : (
                    <span>••••••••</span>
                  )}
                  <span onClick={() => togglePasswordVisibility(user.user_id)} className="eye-icon">
                    {visiblePasswords[user.user_id] ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </span>
                </TableCell>
                <TableCell align="left" className="table-cell">
                  {user.editing ? (
                    <button onClick={() => handlePatch(user.user_id)}>Save</button>
                  ) : (
                    <Fab  size="small" color="secondary" aria-label="edit" onClick={() => toggleEditing(user.user_id)} >
                                   <EditIcon />
                     </Fab>
                     
                    // <EditIcon onClick={() => toggleEditing(user.user_id)} className="edit-icon" />
                  )}
                </TableCell>
                <TableCell align="left" className="table-cell">
                 <Fab color="secondary" size="small"  onClick={() => handleDelete(user.user_id)}>
                    <DeleteIcon />
                </Fab>
                  {/* <DeleteIcon onClick={() => handleDelete(user.user_id)} className="delete-icon" /> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
