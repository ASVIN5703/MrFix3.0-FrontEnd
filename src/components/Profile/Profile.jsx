import React, { useEffect, useState } from 'react';
import { useAdminContext } from '../AdminContext';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import impic from './prof.jpg';

const Profile = () => {
  const { adminId } = useAdminContext();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("adminId");
    const role = localStorage.getItem("role");
    const endpoint = (role === "admin") ? `admin/profile?id=${id}` : `user/${id}`;
    console.log("hia" + id);
    axios.get(`http://localhost:8080/${endpoint}`)
      .then((response) => {
        console.log(response.data);
        setProfileData(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [adminId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <img src={impic} alt="Profile" style={{ marginTop:'6%',width: '42%', height: ' 35%', borderRadius: '50%', marginBottom: '20px' }} />
    <div   className="table-container" style={{ marginTop:'10%',paddingTop:'10px',padding:'10px',display: 'flex', justifyContent: 'center', alignItems: 'center', height: '35vh' }}>
      <TableContainer component={Paper} style={{ maxWidth: '510px', width: '100%',overflow:"-moz-hidden-unscrollable",backgroundColor:"blue" }}>
        <Table className="table" aria-label="caption table" style={{width:'100'}}>
          <TableHead>
            <TableRow className="table-header-row">
              <TableCell  className="table-cell" align="left">Id</TableCell>
              <TableCell  className="table-cell" align="left" >{(localStorage.getItem("role")=="admin")?profileData.id:profileData.user_id}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            <TableRow className="table-header-row">
              <TableCell   className="table-cell" align="left">Name</TableCell>
              <TableCell className="table-cell" align="left">{localStorage.getItem("role") === "admin" ? profileData.admin_name : profileData.user_name}</TableCell>
            </TableRow>
            <TableRow className="table-header-row">
              <TableCell  className="table-cell" align="left">Email</TableCell>
              <TableCell>{localStorage.getItem("role") === "admin" ? profileData.admin_email : profileData.user_email}</TableCell>
            </TableRow>
            <TableRow className="table-header-row">
              <TableCell  className="table-cell" align="left">Contact</TableCell>
              <TableCell>{localStorage.getItem("role") === "user" ? profileData.user_contact : "6380254977"}</TableCell>
            </TableRow>
       
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </div>
  );
};

export default Profile;
