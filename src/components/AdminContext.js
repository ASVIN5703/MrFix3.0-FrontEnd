// AdminContext.js
import React, { createContext, useContext, useState } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [adminId, setAdminId] = useState(null);

  const setLoggedInAdminId = (id) => {
    setAdminId(id);
  };

  return (
    <AdminContext.Provider value={{ adminId, setLoggedInAdminId }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  return useContext(AdminContext);
};
