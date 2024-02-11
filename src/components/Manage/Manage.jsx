import React from "react";
import { useEffect ,useState} from "react";
import axios from "axios";
import "./Manage.css";
import UserTable from '../Table/UserTable'

const Manage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const fetchAllComplaints = () => {
    axios.get("http://localhost:8080/viewusers")
      .then((response) => {
        console.log(typeof response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    // Fetch all complaints when the component mounts
    fetchAllComplaints();
  }, []);
  const searchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/searchusers?term=${searchTerm}`);
      const searchResults = Array.isArray(response.data) ? response.data : [response.data];
      setUsers(searchResults);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  return (
    <>
    
    <div className="manage">
    <h1 className="page-head">Manage Complaints</h1>
      <div className="container">
        <div className="manage-events">
          <div className="manage-events-button" onClick={fetchAllComplaints}>View All Users</div>
        </div>
        <div className="box">
          <input type="text" placeholder="Find Users"  onChange={(e) => setSearchTerm(e.target.value)}></input>
          <a href="#">
            <i class="fas fa-search" onClick={searchUser}></i>
          </a>
        </div>
      </div>
      <UserTable initialUsers={users} />
    </div>
   
    </>
  );
};

export default Manage;
