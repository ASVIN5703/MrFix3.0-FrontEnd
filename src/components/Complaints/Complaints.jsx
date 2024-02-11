import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
} from '@mui/material';
import { makeStyles } from '@mui/styles'; // Use this import instead

const useStyles = makeStyles({
 
  table: {
    minWidth: 650,
  },
  tableHeader: {
    fontWeight: 'bold',
    backgroundColor: '#f5f5f5',
  },
  tableRow: {
    '&:nth-of-type(even)': {
      backgroundColor: '#f9f9f9',
    },
  },
  completed: {
    background: '#90EE90',
    color: 'green',
  },
  pending: {
    background: '#ffadad8f',
    color: 'red',
  },
  inProgress: {
    background: 'yellow',
    color: '#FFA500',
  },
  selectEmpty: {
    background: 'transparent',
    border: 'none',
  },
  selectRoot: {
    width: '100%',
  },
});

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1); // New state to keep track of total pages
  const classes = useStyles();

  const fetchData = async () => {
    try {
      const role=localStorage.getItem("role");
      const endpoint=(role=="user")?`complaints/search?user_name=${localStorage.getItem("user_name")}&`:`viewcomp`;
      const response = await axios.get(`http://localhost:8080/${endpoint}?page=${currentPage}&size=${entriesPerPage}`); // Replace with your API URL
      console.log( response.data);
      setComplaints(response.data.content);
      // setTotalPages(Math.ceil(response.headers['X-Total-Count'] / entriesPerPage));
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching data:', error); 
    }
  };

  useEffect(() => {
 
    fetchData();
  }, [currentPage, entriesPerPage]);

  const handleStatusChange = async(event, index) => {
    const updatedComplaints = [...complaints];
    updatedComplaints[index].comp_status = event.target.value;
    
    try {
      console.log(updatedComplaints[index].comp_id);
      
    const response=  await axios.patch(`http://localhost:8080/comp/${updatedComplaints[index].comp_id}`, {
        newStatus: event.target.value,
      });
      console.log("updated values"+response.data);
      setComplaints(updatedComplaints);
      
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  const handleNextPage = () => {
   // if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
   // }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
     <div>
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous Page
        </Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next Page
        </Button>
      </div>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="complaints table">
        <TableHead>
          <TableRow className={classes.tableHeader}>
            <TableCell>Complaint Id</TableCell>
            <TableCell>Complainant</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Issue</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {complaints.map((complaint, index) => (
            <TableRow key={complaint.comp_id} className={classes.tableRow}>
              <TableCell>{complaint.comp_id}</TableCell>
              <TableCell>{complaint.complainant}</TableCell>
              <TableCell>{complaint.comp_sub}</TableCell>
              <TableCell>{complaint.comp_issue}</TableCell>
              <TableCell>
                <Select
                  value={complaint.comp_status||"" } // Use default value if comp_status is empty
                  onChange={(event) => handleStatusChange(event, index)}
                  displayEmpty
                  className={classes.selectEmpty}
                  inputProps={{ 'aria-label': 'status' }}
                  variant="outlined"
                  fullWidth
                  style={{ width: '150px' }} 
                  classes={{ root: classes.selectRoot }}
                >
                  <MenuItem value="resolved" disabled className={classes.selectEmpty}>
                   resolved
                  </MenuItem>
                  <MenuItem value="completed" className={`${classes.completed} ${classes.selectEmpty}`}>
                    Completed
                  </MenuItem>
                  <MenuItem value="pending" className={`${classes.pending} ${classes.selectEmpty}`}>
                    Pending
                  </MenuItem>
                  <MenuItem value="InProgress" className={`${classes.inProgress} ${classes.selectEmpty}`}>
                    In Progress
                  </MenuItem>
                </Select>
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default Complaints;
