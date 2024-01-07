import React from 'react'
import './MainDash.css'
import Cards from '../Cards/Cards'
import Table from '../Table/Table'
import Buttons from '../Buttons/Buttons';
import UserForm from '../UserForm/UserForm';
const MainDash = () => {
  return (
    <div className="MainDash">
        <h1 className='page-head'>DashBoard</h1>
        <Cards/>
        <div className='buttons-feature'>
        <UserForm/>
        <Buttons/>
        </div>
        <h3 className="table-heading">Recent Complaints</h3>
        <Table/>
    </div>
  )
}

export default MainDash