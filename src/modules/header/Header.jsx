import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import { useHistory } from "react-router-dom";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  header: {
    backgroundColor: theme.palette.primary.light,
    height: "100%",
    border: "solid 2px",
    borderColor: theme.palette.primary.main,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)",
    color: "#4B5C6B",
  }
}))

const Header = () => {
  const classes = useStyles();
  let history = useHistory();

  const goToHome = () => {
    history.push("/");
  }

  return (
    <div className={classes.header}>
      <div className="logo" onClick={goToHome}>
        <ShoppingCartIcon fontSize="large" />
        <h3>SGC</h3>
      </div>
      <div className="links">
        <NavLink to="/employees" activeClassName="active" className="first-link">Empleados</NavLink>
        <NavLink to="/products" activeClassName="active">Productos</NavLink>
        <NavLink to="/sales" activeClassName="active">Ventas</NavLink>
      </div>
    </div>
  )
}

export default Header;