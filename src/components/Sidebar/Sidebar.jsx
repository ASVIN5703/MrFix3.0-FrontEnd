// import React, { useEffect } from 'react'
import './Sidebar.css'
import { useState } from 'react';

import { SidebarData } from '../../Data/Data';
import {UilSignOutAlt} from '@iconscout/react-unicons';
import { useNavigate } from 'react-router-dom';



const Sidebar = () => {
  const navigate=useNavigate('/maindash');
      const[selected,setSelected] = useState(0);
      const handleSidebarItemClick = (index) => {
        setSelected(index);
        navigate(SidebarData[index].path); // Assuming you have a 'path' property in each SidebarData item
      };
     

  return (
    
    <div className='Sidebar'>
        {/* logo */}
          <div className='logo'>
            <img src='https://tinyurl.com/mrfix-logo' alt='img-error'/>
            <span>
                Mr.Fix
            </span>
          </div>
          
          {/* menu */}
          <div className='menu'>
              {SidebarData.map((item,index)=>{
                return(
                  <div className={selected===index?'menuItem active':'menuItem'}
                  key={index}
                  onClick={() => handleSidebarItemClick(index)}>
                        <item.icon/>
                        <span>
                          {item.heading}
                        </span>
                  </div>
                )
              })}
              <div className='menuItem'>
                <UilSignOutAlt/>LogOut
              </div>
            
          </div>
     
    </div>
  )
}

export default Sidebar;