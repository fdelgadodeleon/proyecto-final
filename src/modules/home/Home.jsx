import React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Typography } from '@material-ui/core';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <ShoppingCartIcon style={{ fontSize: 200 }} />
      <Typography variant="h3">Sistema de Gestión de Comercio</Typography>
    </div>
  )
}

export default Home;