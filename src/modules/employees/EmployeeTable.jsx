import React, { useState } from 'react';
import {
  IconButton,
  CircularProgress,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ConfirmationDialog from '../commons/ConfirmationDialog';
import { useHistory } from 'react-router-dom';

const EmployeeTable = ({ employees, loading, deleteEmployee, loadingDelete }) => {
  const history = useHistory();

  const [openConfirm, setOpenConfirm] = useState(false)
  const [currentEmployee, setCurrentEmployee] = useState({})

  const hanldeEdit = id => {
    history.push(`/employees/edit/${id}`)
  }

  const handleDelete = employee => {
    setOpenConfirm(true)
    setCurrentEmployee(employee)
  }

  const onDelete = () => {
    deleteEmployee(currentEmployee.id)
    setOpenConfirm(false)
  }

  return (
    <div>
      <ConfirmationDialog
        open={openConfirm}
        onConfirm={onDelete}
        onClose={() => setOpenConfirm(false)}
        loading={loadingDelete}
        message={`¿Confirma que desea eliminar el producto ${currentEmployee.firstName} ${currentEmployee.firstSurname}?`}
      />
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
              <TableCell>Acciones</TableCell>
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
                <TableCell>
                  <IconButton title="Eliminar" onClick={() => handleDelete(row)}>
                    <DeleteIcon style={{ color: "darkred" }} />
                  </IconButton>
                  <IconButton title="Modificar" onClick={() => hanldeEdit(row.id)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>

  );
}

export default EmployeeTable