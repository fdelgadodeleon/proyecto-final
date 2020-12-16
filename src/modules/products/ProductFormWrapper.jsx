import React, { useEffect, useState } from 'react';
import ProductForm from './ProductForm';
import {
  Typography,
  CircularProgress,
  SnackbarContent,
  Snackbar
} from '@material-ui/core';
import './products.css';
import { requests } from '../../utils/requestHandler';

const ProductFormWrapper = ({ match, history }) => {
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentProduct, setCurrentProduct] = useState({})

  useEffect(() => {
    setLoading(true)
    requests.get('/brands')
      .then(res => setBrands(res.data))
      .catch(error => setError(error))
      .then(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (match.params.id) {
      setLoading(true)
      requests.get(`/products/${match.params.id}`)
        .then(res => setCurrentProduct(res.data))
        .catch(error => setError(error))
        .then(() => setLoading(false))
    } else {
      setCurrentProduct({
        code: "",
        name: "",
        description: "",
        brandId: "",
        price: "",
        stock: "",
        weight: ""
      })
    }
  }, [match])

  const handleSubmit = async product => {
    setLoadingSubmit(true)
    try {
      match.params.id ? await update(product) : await create(product)
      setLoadingSubmit(false)
      history.push("/products")
    } catch (error) {
      setLoadingSubmit(false)
      setError(error)
    }
  }

  const create = product => requests.post('/products', product)
  const update = product => requests.put(`/products/${match.params.id}`, product)

  const handleCancel = () => {
    history.goBack()
  }

  return (
    <div>
      <Typography variant="h4" className="center">{match.params.id ? 'Modificar Producto' : 'Nuevo Producto'}</Typography>
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
      {!loading &&
        <ProductForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loadingSubmit={loadingSubmit}
          brands={brands}
          currentProduct={currentProduct}
        />
      }
    </div>
  )
}

export default ProductFormWrapper;