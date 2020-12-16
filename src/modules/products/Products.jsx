import React, { useEffect, useState } from 'react';
import { Snackbar, SnackbarContent, Typography, Button } from '@material-ui/core';
import ProductTable from './ProductTable';
import './products.css';
import axios from 'axios';
import { requests } from '../../utils/requestHandler';

const Products = ({ history }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [loadingDelete, setLoadingDelete] = useState(false)

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
    requests.get('https://5faeb24463e40a0016d8a044.mockapi.io/api/products')
      .then(res => {
        setProducts(res.data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
        setError(error)
      })
  }, [])

  const goToForm = () => {
    history.push('/products/new')
  }

  const deleteProduct = id => {
    setLoadingDelete(true)
    axios.delete(`https://5faeb24463e40a0016d8a044.mockapi.io/api/products/${id}`)
      .then(() => {
        console.log(products.find(product => product.id === id))
        console.log(products.filter(product => product.id !== id))
        setProducts(products.filter(product => product.id !== id))
      })
      .catch(err => {
        console.log(err)
        setError("Hubo un error en la consulta")
      })
      .then(() => {
        setLoadingDelete(false)
      })
  }

  return (
    <div>
      <div className="button">
        <Button variant="outlined" color="secondary" onClick={goToForm}>Agregar</Button>
      </div>
      <Typography variant="h4" className="center">Productos</Typography>
      <ProductTable
        products={products}
        loading={loading}
        deleteProduct={deleteProduct}
        loadingDelete={loadingDelete}
      />
      {error && (
        <Snackbar open={!!error} onClose={() => setError(null)}>
          <SnackbarContent className="error" message={error} />
        </Snackbar>
      )}
    </div>
  )
}

export default Products;
