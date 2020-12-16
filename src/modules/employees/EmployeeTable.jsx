import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

const EmployeeTable = ({ employees, loading }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nº</TableCell>
            <TableCell>Nombres</TableCell>
            <TableCell>Apellidos</TableCell>
            <TableCell>Fecha de Nacimiento</TableCell>
            <TableCell>Fecha de Ingreso</TableCell>
            <TableCell>Sector</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading && (
            <TableRow>
              <TableCell colSpan={7} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          )}
          {!loading && employees && employees.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.number}</TableCell>
              <TableCell>{row.firstName} {row.secondName}</TableCell>
              <TableCell>{row.firstSurname} {row.secondSurname}</TableCell>
              <TableCell>{row.birthdate}</TableCell>
              <TableCell>{row.admissionDate}</TableCell>
              <TableCell>{row.sectorId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EmployeeTable