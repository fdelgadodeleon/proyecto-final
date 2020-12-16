import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ConfirmationDialog from '../commons/ConfirmationDialog';

const ProductTable = ({ products, loading, deleteProduct, loadingDelete }) => {
  const history = useHistory();

  const [openConfirm, setOpenConfirm] = useState(false)
  const [currentProduct, setCurrentProduct] = useState({})

  const hanldeEdit = id => {
    history.push(`/products/edit/${id}`)
  }

  const handleDelete = product => {
    setOpenConfirm(true)
    setCurrentProduct(product)
  }

  const onDelete = () => {
    deleteProduct(currentProduct.id)
    setOpenConfirm(false)
  }

  return (
    <div>
      <ConfirmationDialog
        open={openConfirm}
        onConfirm={onDelete}
        onClose={() => setOpenConfirm(false)}
        loading={loadingDelete}
        message={`¿Confirma que desea eliminar el producto ${currentProduct.code} ${currentProduct.name}?`}
      />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripcion</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell align="right">Precio Unitario</TableCell>
              <TableCell align="right">Stock</TableCell>
              <TableCell align="right">Peso</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}
            {!loading && products && products.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.code}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.brandId}</TableCell>
                {/* <TableCell>{row.brand ? row.brand.name : ''}</TableCell> */}
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.stock}</TableCell>
                <TableCell align="right">{row.weight}</TableCell>
                <TableCell>
                  <IconButton title="Eliminar" onClick={() => handleDelete(row)}>
                    <DeleteIcon style={{ color: "darkred" }} />
                  </IconButton>
                  <IconButton title="Modificar" onClick={() => hanldeEdit(row.id)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ProductTable
