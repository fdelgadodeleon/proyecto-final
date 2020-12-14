import React, { useEffect, useState } from 'react';
import ProductForm from './ProductForm';
import axios from 'axios';
import {
  Typography,
  CircularProgress,
  SnackbarContent,
  Snackbar
} from '@material-ui/core';
import './products.css';

const ProductFormWrapper = ({ match, history }) => {
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentProduct, setCurrentProduct] = useState({})

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

  useEffect(() => {
    if (match.params.id) {
      setLoading(true)
      axios(`https://5faeb24463e40a0016d8a044.mockapi.io/api/products/${match.params.id}`)
        .then(res => {
          setCurrentProduct(res.data)
          setLoading(false)
        })
        .catch(error => {
          console.log(error)
          setLoading(false)
          setError("Hubo un error en la consulta")
        })
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
      const res = match.params.id ? await update(product) : await create(product)
      console.log(res)
      setLoadingSubmit(false)
      history.push("/products")
    } catch (error) {
      setLoadingSubmit(false)
      setError("Hubo un error en la consulta")
    }
  }

  const create = product => axios.post('https://5faeb24463e40a0016d8a044.mockapi.io/api/products', product)
  const update = product => axios.put(`https://5faeb24463e40a0016d8a044.mockapi.io/api/products/${match.params.id}`, product)

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