import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './ProfileBl.css'

function createData( key , value ) {
  return { key , value };
}

const rows = [
  createData('Designation', "Student"),
  createData('Password', "39vifjd9"),
  createData('E-mail', "gandhi@gmail.com"),
  createData('Contact', "963569564"),
]

export default function BasicTable() {
  return (
    <TableContainer component={Paper} sx={{
        padding: "0px 0px",
        backgroundColor: " #ffffff00",
        fontSize: "1.1rem"
      }} className='profile-table-container'>
       <Table className='profile-table' aria-label="simple table">
        <TableBody  className='profile-table-body'>
          {rows.map((row) => (
            <TableRow
              key={row.key}
            >
              <TableCell component="th" scope="row" className='profile-table-cell'>
                {row.key}
              </TableCell>
              <TableCell align="right" className='profile-table-cell'>{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
