import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import { useHistory } from "react-router-dom";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const Header = () => {
  let history = useHistory();

  const goToHome = () => {
    history.push("/");
  }

  return (
    <div className="header">
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