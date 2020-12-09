import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

const ProductTable = ({ products, loading }) => {
  return (
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
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.stock}</TableCell>
              <TableCell align="right">{row.weight}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProductTable