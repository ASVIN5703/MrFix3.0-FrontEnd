import * as React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
import { nanoid } from 'nanoid';
import Table from '../Table/Table'
import '../Complaints/Complaints.css'

const Complaints = () => {
  return (
    <div className="complaint-table">
        {/* <h3>Recent Complaints</h3>
    <TableContainer component={Paper}
     style={{boxShadow: '0px 13px 20px 0px #80808029'}}
    >
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell>Complaint Id</TableCell>
            <TableCell align="left">Date and Time</TableCell>
            <TableCell align="left">Complaint Desc</TableCell>
            <TableCell align="left">Complaint Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.complaintId}
              </TableCell>
              <TableCell align="left">{row.date}</TableCell>
              <TableCell align="left">{row.complaintDesc}</TableCell>
              <TableCell align="left"><span className='status' style={makeStyles(row.complaintStatus)}>{row.complaintStatus}</span></TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> */}
    <h1 className="page-head">Complaints</h1>
    <Table/>
    </div>
  );
}

export default Complaints





function createData(complaintId,date, complaintDesc,complaintStatus) 
{
  return { complaintId,date, complaintDesc,complaintStatus};
}

const rows = [
  createData(nanoid(), Date(), 'HCL Lab sys-no:23 Mouse Not working','Completed'),
  createData(nanoid(), Date(), 'Wipro Lab sys-no:22 No Internet Connection','Pending'),
  createData(nanoid(), Date(), '3rd year CSE-A Projector not Working','In Progress'),
];

const makeStyles=(complaintStatus)=>{
  if(complaintStatus==='Completed'){
      return {
        background:'#90EE90',
        color: 'green',
      }
  }
  else if(complaintStatus==='Pending'){
    return {
       background: '#ffadad8f',
       color: 'red',
    }
  }
  else{
    return {
      background: 'yellow',
      color: '#FFA500',
    }
  }
}