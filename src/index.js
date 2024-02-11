import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AdminProvider } from './components/AdminContext.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AdminProvider>
      <App />
    </AdminProvider>
    </BrowserRouter>
  </React.StrictMode>
);


