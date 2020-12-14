import React from 'react';
import {
  Grid,
  TextField,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  CircularProgress,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import { useFormik } from 'formik';

const EmployeeForm = ({ currentEmployee, sectors, loading, loadingSubmit, onSubmit, onCancel }) => {

  /**
   * Inicialización de formik
   */
  const formik = useFormik({
    initialValues: currentEmployee,
    onSubmit: values => {
      onSubmit(values)
    },
  })

  return (
    <div>
      {loading && <div className="spinner"><CircularProgress /></div>}
      {!loading && (
        <form className="form" onSubmit={formik.handleSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={3}>
              <TextField
                id="firstName"
                label="Primer nombre"
                variant="outlined"
                fullWidth
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                id="secondName"
                label="Segundo nombre"
                variant="outlined"
                fullWidth
                name="secondName"
                value={formik.values.secondName}
                onChange={formik.handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                id="firstSurname"
                label="Primer apellido"
                variant="outlined"
                fullWidth
                name="firstSurname"
                value={formik.values.firstSurname}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                id="secondSurname"
                label="Segundo apellido"
                variant="outlined"
                fullWidth
                name="secondSurname"
                value={formik.values.secondSurname}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid item xs={12} md={3}>
              <TextField
                id="number"
                label="Número"
                variant="outlined"
                fullWidth
                name="number"
                value={formik.values.number}
                onChange={formik.handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                id="birthdate"
                label="Fecha de nacimiento"
                variant="outlined"
                fullWidth
                name="birthdate"
                value={formik.values.birthdate}
                onChange={formik.handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                id="phone"
                label="Teléfono"
                variant="outlined"
                fullWidth
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                id="mobilePhone"
                label="Celular"
                variant="outlined"
                fullWidth
                name="mobilePhone"
                value={formik.values.mobilePhone}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6}>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="reference"
                label="Referencia"
                variant="outlined"
                fullWidth
                name="reference"
                value={formik.values.reference}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="sector-label">Sector</InputLabel>
                <Select
                  labelId="sector-label"
                  id="sector"
                  label="Sector"
                  name="sectorId"
                  value={formik.values.sectorId}
                  onChange={formik.handleChange}
                >
                  <MenuItem value="">
                    <em>Ninguno</em>
                  </MenuItem>
                  {sectors && sectors.map(sector => (
                    <MenuItem key={sector.id} value={sector.id}>{sector.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                id="admissionDate"
                label="Fecha de ingreso"
                variant="outlined"
                fullWidth
                name="admissionDate"
                value={formik.values.admissionDate}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControlLabel
                control={<Checkbox checked={formik.values.active} onChange={formik.handleChange} name="active" />}
                label="Activo"
              />
            </Grid>
          </Grid>
          <Grid container spacing={5} direction="row" justify="center">
            <Grid item>
              <Button
                variant="outlined"
                color="secondary"
                disabled={loadingSubmit}
                onClick={onCancel}>Cancelar</Button>
              <Button
                style={{ marginLeft: 20 }}
                type="submit"
                variant="contained"
                color="primary"
                disabled={loadingSubmit}>Guardar</Button>
            </Grid>
          </Grid>
        </form>
      )}
    </div>
  )
}

export default EmployeeForm;