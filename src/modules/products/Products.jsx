import React, { useEffect, useState } from 'react';
import { Snackbar, SnackbarContent, Typography } from '@material-ui/core';
import ProductTable from './ProductTable';
import './products.css';

const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch('https://5faeb24463e40a0016d8a044.mockapi.io/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
        console.log(data)
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
        setError("Hubo un error en la consulta")
      })
  }, [])

  return (
    <div>
      <Typography variant="h4" className="center">Productos</Typography>
      <ProductTable products={products} loading={loading} />
      {error && (
        <Snackbar open={!!error} onClose={() => setError(null)}>
          <SnackbarContent className="snackbar" message={error} />
        </Snackbar>
      )}
    </div>
  )
}

export default Products;