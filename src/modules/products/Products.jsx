import React, { useEffect, useState } from 'react';
import { Snackbar, SnackbarContent, Typography, Button } from '@material-ui/core';
import ProductTable from './ProductTable';
import './products.css';
import { requests } from '../../utils/requestHandler';

const Products = ({ history }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [loadingDelete, setLoadingDelete] = useState(false)

  useEffect(() => {
    setLoading(true)
    requests.get('/products')
      .then(res => setProducts(res.data))
      .catch(error => setError(error))
      .then(() => setLoading(false))
  }, [])

  const goToForm = () => {
    history.push('/products/new')
  }

  const deleteProduct = id => {
    setLoadingDelete(true)
    requests.delete(`/products/${id}`)
      .then(() => {
        console.log(products.find(product => product.id === id))
        console.log(products.filter(product => product.id !== id))
        setProducts(products.filter(product => product.id !== id))
      })
      .catch(error => setError(error))
      .then(() => setLoading(false))
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