import React, { useEffect, useState } from 'react';
import {
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  CircularProgress,
  SnackbarContent,
  Snackbar
} from '@material-ui/core';
import axios from 'axios';

const ProductForm = ({ history }) => {
  const [product, setProduct] = useState({
    code: "",
    name: "",
    description: "",
    brandId: "",
    price: "",
    stock: "",
    weight: ""
  })
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [loadingSubmit, setLoadingSubmit] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios('https://5faeb24463e40a0016d8a044.mockapi.io/api/brands')
      .then(res => {
        setBrands(res.data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
        setError("Hubo un error en la consulta")
      })
  }, [])

  const handleChange = event => {
    const { name, value } = event.target

    setProduct({
      ...product,
      [name]: value
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    setLoadingSubmit(true)
    axios.post('https://5faeb24463e40a0016d8a044.mockapi.io/api/products', product)
      .then(res => {
        setLoadingSubmit(false)
        history.push("/products")
      })
      .catch(error => {
        setLoadingSubmit(false)
        setError("Hubo un error en la consulta")
      })
  }

  const handleCancel = () => {
    history.goBack()
  }

  return (
    <div>
      <Typography variant="h4" className="center">Nuevo Producto</Typography>
      {loading && (
        <div className="spinner">
          <CircularProgress />
        </div>
      )}
      {error && (
        <Snackbar open={!!error} onClose={() => setError(null)}>
          <SnackbarContent className="error" message={error} />
        </Snackbar>
      )}
      {!loading && (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={3}>
              <TextField
                id="code"
                label="Código"
                variant="outlined"
                className="input"
                name="code"
                value={product.code}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                id="name"
                label="Nombre"
                variant="outlined"
                className="input"
                name="name"
                value={product.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="description"
                label="Descripción"
                variant="outlined"
                className="input"
                name="description"
                value={product.description}
                onChange={handleChange} />
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid item xs={12} md={3}>
              <FormControl variant="outlined" className="input">
                <InputLabel id="brand-label">Marca</InputLabel>
                <Select
                  labelId="brand-label"
                  id="brand"
                  value={product.brandId}
                  onChange={handleChange}
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
                value={product.price}
                onChange={handleChange} />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                id="stock"
                label="Stock"
                variant="outlined"
                className="input"
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChange} />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                id="weight"
                label="Peso"
                variant="outlined"
                className="input"
                type="number"
                name="weight"
                value={product.weight}
                onChange={handleChange} />
            </Grid>
          </Grid>
          <Grid container spacing={5} justify="center">
            <Grid item>
              <Button
                variant="outlined"
                style={{ marginRight: 30 }}
                color="primary"
                onClick={handleCancel}
                disabled={loadingSubmit}>Cancelar</Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={loadingSubmit}>Aceptar</Button>
            </Grid>
          </Grid>
        </form>
      )}
    </div>
  )
}

export default ProductForm;