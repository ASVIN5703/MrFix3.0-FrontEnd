import React, { useEffect, useState } from 'react';
import { useAdminContext } from '../AdminContext';
import axios from 'axios';

const Profile = () => {
  const { adminId } = useAdminContext();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const id=localStorage.getItem("adminId");
    const role=localStorage.getItem("role");
    const endpoint=(role=="admin")?`admin/profile?id=${id}`:`user/${id}`;
    console.log("hia"+id);
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
    <div>
      <h2>Profile</h2>
      {profileData && (
        <div>
          <p>Name: {localStorage.getItem("role")=="admin"?profileData.admin_name:profileData.user_name}</p>
          <p>Email: {localStorage.getItem("role")=="admin"?profileData.admin_email:profileData.user_email}</p>
          <p>Contact:{localStorage.getItem("role")=="user"?profileData.user_contact:"6380254977"}</p>
          {/* Add more fields as needed */}
        </div>
      )}
    </div>
  );
};

export default Profile;
