import React, { useEffect, useState } from 'react';
import { Snackbar, SnackbarContent, Typography, Button } from '@material-ui/core';
import EmployeeTable from './EmployeeTable';
import './employees.css';
import axios from 'axios';

const Employees = ({ history }) => {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)


  useEffect(() => {
    setLoading(true)
    axios('https://5faeb24463e40a0016d8a044.mockapi.io/api/employees')
      .then(res => {
        setEmployees(res.data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
        setError("Hubo un error en la consulta")
      })
  }, [])

  const goToForm = () => {
    history.push('/employees/new')
  }

  return (
    <div>
      <div className="button">
        <Button variant="outlined" color="secondary" onClick={goToForm}>Agregar</Button>
      </div>
      <Typography variant="h4" className="center">Empleados</Typography>
      <EmployeeTable employees={employees} loading={loading} />
      {error && (
        <Snackbar open={!!error} onClose={() => setError(null)}>
          <SnackbarContent className="error" message={error} />
        </Snackbar>
      )}
    </div>
  )
}

export default Employees;