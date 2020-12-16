import React, { useEffect, useState } from 'react';
import { Snackbar, SnackbarContent, Typography, Button } from '@material-ui/core';
import EmployeeTable from './EmployeeTable';
import './employees.css';
import { requests } from '../../utils/requestHandler';

const Employees = ({ history }) => {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [loadingDelete, setLoadingDelete] = useState(false)

  /**
   * Al montar el componente realiza una request al backend para cargar el listado de empleados
   */
  useEffect(() => {
    setLoading(true)
    requests.get('/employees')
      .then(res => setEmployees(res.data))
      .catch(error => setError(error))
      .then(() => setLoading(false))
  }, [])

  const goToForm = () => {
    history.push('/employees/new')
  }

  const deleteEmployee = id => {
    setLoadingDelete(true)
    requests.delete(`/employees/${id}`)
      .then(() => {
        setEmployees(employees.filter(employee => employee.id !== id))
      })
      .catch(error => setError(error))
      .then(() => setLoading(false))
  }

  return (
    <div>
      <div className="button">
        <Button variant="outlined" color="secondary" onClick={goToForm}>Agregar</Button>
      </div>
      <Typography variant="h4" className="center">Empleados</Typography>
      <EmployeeTable
        employees={employees}
        loading={loading}
        loadingDelete={loadingDelete}
        deleteEmployee={deleteEmployee}
      />
      {error && (
        <Snackbar open={!!error} onClose={() => setError(null)}>
          <SnackbarContent className="error" message={error} />
        </Snackbar>
      )}
    </div>
  )
}

export default Employees;