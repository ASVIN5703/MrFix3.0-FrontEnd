import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { nanoid } from 'nanoid';
import EditIcon from '@mui/icons-material/Edit'; // Import the Edit icon from MUI
import DeleteIcon from '@mui/icons-material/Delete'; // Import the Delete icon from MUI
import './Table.css'

function createData(complaintId,date, complaintDesc,complaintStatus) 
{
  return { complaintId,date, complaintDesc,complaintStatus};
}

const rows = [
  createData(nanoid(), Date(), 'HCL Lab sys-no:23 Mouse Not working','Completed'),
  createData(nanoid(), Date(), 'Wipro Lab sys-no:22 No Internet Connection','Pending'),
  createData(nanoid(), Date(), '2nd year CSE-A Projector not Working','In Progress'),
];

const makeStyles=(complaintStatus)=>{
  if(complaintStatus==='Completed'){
      return {
        background:'#90EE90',
        color : 'rgb(12, 49, 12)',
      }
  }
  else if(complaintStatus==='Pending'){
    return {
       background: '#ffadad8f',
       color:'rgb(106, 11, 11)',
    }
  }
  else{
    return {
      background: 'yellow',
      color:'rgb(68, 68, 0)' , 
    }
  }
}

export default function AccessibleTable() {
  return (
  <div className="table-container">
  <TableContainer component={Paper} className="table-paper">
    <Table className="table" aria-label="caption table">
      <TableHead>
        <TableRow className='table-header-row'>
          <TableCell className="table-cell">Complaint Id</TableCell>
          <TableCell className="table-cell" align="left">Date and Time</TableCell>
          <TableCell className="table-cell" align="left">Complaint Desc</TableCell>
          <TableCell className="table-cell" align="left">Complaint Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.name} className="table-row">
            <TableCell component="th" scope="row" className="table-cell">
              {row.complaintId}
            </TableCell>
            <TableCell align="left" className="table-cell">{row.date}</TableCell>
            <TableCell align="left" className="table-cell">{row.complaintDesc}</TableCell>
            <TableCell align="left" className="table-cell">
              <span className='status' style={makeStyles(row.complaintStatus)}>
                {row.complaintStatus}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
</div>
 );
}