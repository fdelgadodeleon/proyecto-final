import React, { useEffect, useState } from 'react';
import { Snackbar, SnackbarContent, Typography, Button } from '@material-ui/core';
import ProductTable from './ProductTable';
import './products.css';
import axios from 'axios';

const Products = ({ history }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // useEffect(() => {
  //   setLoading(true)
  //   fetch('https://5faeb24463e40a0016d8a044.mockapi.io/api/produts')
  //     .then(res => {
  //       console.log(res)
  //       if (res.ok) {
  //         return res.json()
  //       } else {
  //         return Promise.reject("Hubo un error")
  //       }
  //     })
  //     .then(data => {
  //       setProducts(data)
  //       setLoading(false)
  //       console.log(data)
  //     })
  //     .catch(error => {
  //       console.log(error)
  //       setLoading(false)
  //       setError("Hubo un error en la consulta")
  //     })
  // }, [])

  useEffect(() => {
    setLoading(true)
    axios('https://5faeb24463e40a0016d8a044.mockapi.io/api/products')
      .then(res => {
        setProducts(res.data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
        setError("Hubo un error en la consulta")
      })
  }, [])

  const goToForm = () => {
    history.push('/products/new')
  }

  return (
    <div>
      <div className="button">
        <Button variant="outlined" color="secondary" onClick={goToForm}>Agregar</Button>
      </div>
      <Typography variant="h4" className="center">Productos</Typography>
      <ProductTable products={products} loading={loading} />
      {error && (
        <Snackbar open={!!error} onClose={() => setError(null)}>
          <SnackbarContent className="error" message={error} />
        </Snackbar>
      )}
    </div>
  )
}

export default Products;