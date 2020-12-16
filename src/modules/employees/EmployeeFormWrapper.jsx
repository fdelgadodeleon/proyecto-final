import React, { useEffect, useState } from 'react';
import { Typography, SnackbarContent, Snackbar } from '@material-ui/core';
import EmployeeForm from './EmployeeForm';
import { requests } from '../../utils/requestHandler';

const EmployeeFormWrapper = ({ match, history }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentEmployee, setCurrentEmployee] = useState(null)
  const [sectors, setSectors] = useState([])
  const [loadingSubmit, setLoadingSubmit] = useState(false)

  /**
   * Si viene un id en la ruta, busca un empleado por id y carga los datos en el formulario
   * Si no, setea los valores vacíos para el formulario.
   */
  useEffect(() => {
    if (match.params.id) {
      setLoading(true)
      requests.get('/employees')
        .then(data => setCurrentEmployee(data))
        .catch(error => setError(error))
        .then(() => setLoading(false))
    } else {
      setCurrentEmployee({
        firstName: '',
        secondName: '',
        firstSurname: '',
        secondSurname: '',
        number: '',
        birthdate: '',
        phone: '',
        mobilePhone: '',
        email: '',
        reference: '',
        sectorId: '',
        admissionDate: '',
        active: true
      })
    }
  }, [match])

  /**
   * Carga los sectores para el select
   */
  useEffect(() => {
    setLoading(true)
    requests.get('/sectors')
      .then(res => setSectors(res.data))
      .catch(error => setError(error))
      .then(() => setLoading(false))
  }, [])

  /**
   * Ejecuta la request al backend de POST o PUT dependiendo si es un empleado nuevo o una actualización
   */
  const handleSubmit = async employee => {
    try {
      setLoadingSubmit(true)
      match.params.id ? await update(employee) : await create(employee)
      setLoadingSubmit(false)
      history.goBack()
    } catch (error) {
      console.log(error)
      setLoadingSubmit(false)
      setError("Hubo un error al realizar la consulta")
    }
  }

  /**
   * Request para actualizar un empleado
   */
  const update = employee => {
    return requests.put(`/employees/${match.params.id}`, employee);
  }

  /**
   * Request para crear un nuevo empleado
   */
  const create = async employee => {
    return requests.post('/employees', employee)
  }

  const handleCancel = () => {
    history.goBack()
  }

  return (
    <div>
      {error && (
        <Snackbar
          open={!!error}
          onClose={() => setError(null)}
        >
          <SnackbarContent className="error" message={error} />
        </Snackbar>
      )}
      <Typography variant="h4" className="center">{match.params.id ? 'Modificar Empleado' : 'Nuevo Empleado'}</Typography>
      {currentEmployee && (
        <EmployeeForm
          currentEmployee={currentEmployee}
          sectors={sectors}
          loading={loading}
          loadingSubmit={loadingSubmit}
          onSubmit={handleSubmit}
          onCancel={handleCancel} />
      )}
    </div>
  )
}

export default EmployeeFormWrapper;