import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import {
  Grid,
  TextField,
  Button,
  FormControl,
  MenuItem,
  InputLabel,
  Select
} from '@material-ui/core';

const ProductForm = ({ onSubmit, onCancel, loadingSubmit, brands, currentProduct }) => {

  /**
   * Se realizan todas las validaciones necesarias y se setea el objeto errors con los mensajes de error de cada campo 
   */
  const validate = values => {
    const errors = {};
    if (!values.code) {
      errors.code = 'Campo requerido';
    }
    if (!values.name) {
      errors.name = 'Campo requerido';
    }
    return errors;

  }

  /**
   * Se crea una instancia de formik
   */
  const formik = useFormik({
    initialValues: currentProduct,
    onSubmit: values => onSubmit(values),
    validate
  })

  /**
   * Se actualizan los valores del form cada vez que se modifica currentProduct
   */
  useEffect(() => {
    formik.setValues(currentProduct)
  }, [currentProduct])

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={3}>
          <TextField
            id="code"
            label="Código *"
            variant="outlined"
            className="input"
            name="code"
            value={formik.values.code}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.code && formik.touched.code}
            helperText={formik.touched.code ? formik.errors.code : null}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            id="name"
            label="Nombre *"
            variant="outlined"
            className="input"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.name && formik.touched.name}
            helperText={formik.touched.name ? formik.errors.name : null}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="description"
            label="Descripción"
            variant="outlined"
            className="input"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange} />
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid item xs={12} md={3}>
          <FormControl variant="outlined" className="input">
            <InputLabel id="brand-label">Marca</InputLabel>
            <Select
              labelId="brand-label"
              id="brand"
              value={formik.values.brandId}
              onChange={formik.handleChange}
              label="Marca"
              name="brandId"
            >
              <MenuItem value="">
                <em>Ninguna</em>
              </MenuItem>
              {brands && brands.length > 0 && brands.map(brand => (
                <MenuItem key={brand.id} value={brand.id}>{brand.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            id="price"
            label="Precio Unitario"
            variant="outlined"
            className="input"
            type="number"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange} />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            id="stock"
            label="Stock"
            variant="outlined"
            className="input"
            type="number"
            name="stock"
            value={formik.values.stock}
            onChange={formik.handleChange} />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            id="weight"
            label="Peso"
            variant="outlined"
            className="input"
            type="number"
            name="weight"
            value={formik.values.weight}
            onChange={formik.handleChange} />
        </Grid>
      </Grid>
      <Grid container spacing={5} justify="center">
        <Grid item>
          <Button
            variant="outlined"
            style={{ marginRight: 30 }}
            color="secondary"
            onClick={onCancel}
            disabled={loadingSubmit}>Cancelar</Button>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            disabled={loadingSubmit}>Aceptar</Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default ProductForm;