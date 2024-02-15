import React,{useEffect,useState} from 'react'
import './MainDash.css'
import Cards from '../Cards/Cards'
import Table from '../Table/Table'
import Buttons from '../Buttons/Buttons';
import UserForm from '../UserForm/UserForm';
const MainDash = () => {
  const [complaintData, setComplaintData] = useState([]);
 
  const [recentComplaints, setRecentComplaints] = useState([]);
  useEffect(() => {
      // Assume you have an API endpoint for fetching complaint data
      const fetchData = async () => {
          try {
              const role=localStorage.getItem("role");
              const endpoint=(role=="user")?`?role=user&user_name=${localStorage.getItem("user_name")}`:"";
              const response = await fetch('http://localhost:8080/complaints/datas'+endpoint);
              const data = await response.json();
              const recentComp=await fetch('http://localhost:8080/complaints/recents'+endpoint);
              const compdata=await recentComp.json();
              setComplaintData(data);
              setRecentComplaints(compdata);
          } catch (error) {
              console.error('Error fetching complaint data:', error);
          }
      };

      fetchData();
  }, []);
  return (
    <div className="MainDash">
        <h1 className='page-head'>DashBoard</h1>
        <Cards complaintData={complaintData} />
        <div className='buttons-feature'>
        <UserForm/>
        <Buttons/>
        </div>
        <h3 className="table-heading">Recent Complaints</h3>
        <Table complaints={recentComplaints} />
    </div>
  )
}

export default MainDash