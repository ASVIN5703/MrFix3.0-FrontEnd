import React from "react";
import { useEffect ,useState} from "react";
import axios from "axios";
import "./Manage.css";
import UserTable from '../Table/UserTable'

const Manage = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/viewusers") // Replace this with your actual API endpoint
      .then((response) => {
        // Handle the fetched data here
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
    
    <div className="manage">
    <h1 className="page-head">Manage Complaints</h1>
      <div className="container">
        <div className="manage-events">
          <div className="manage-events-button">View All Complaints</div>
        </div>
        <div className="box">
          <input type="text" placeholder="Find Users"></input>
          <a href="#">
            <i class="fas fa-search"></i>
          </a>
        </div>
      </div>
      <UserTable initialUsers={users} />
    </div>
   
    </>
  );
};

export default Manage;
