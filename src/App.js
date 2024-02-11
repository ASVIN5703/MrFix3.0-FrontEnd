import './App.css';
import MainDash from './components/MainDash/MainDash';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import { Routes, Route } from 'react-router';
import Complaints from './components/Complaints/Complaints';
import Manage from './components/Manage/Manage';
import Feedback from './components/Feedback/Feedback';
import UserProfile from './components/UserProfile/UserProfile';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import { useState } from 'react'; // Import useState hook
import { useRoutes } from 'react-router-dom';
import Profile from './components/Profile/Profile.jsx';

function App() {
  const routes = useRoutes([
    { path: '/adminlogin', element: <Login /> },
    { path: '/userprofile', element: <UserProfile /> },
    {path:'/adminprofile',element:<Profile/>},
    { path: '/dashboard', element: <MainDash /> },
    { path: '/complaints', element: <Complaints /> },
    { path: '/manage', element: <Manage /> },
    { path: '/feedback', element: <Feedback /> },
    { path: '/', element: <Home /> },
    {path:'/profile',element:<Profile/>},
  ]);

  const isHome = window.location.pathname === '/'||window.location.pathname==='/adminlogin';


  return (
    <>
    <div id="App">
    {!isHome && <Sidebar />}
      <div className='content-area'>
          {routes}
      </div>
      
    </div>
    
    </>
  );
 
}

export default App;
