import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h1>Esta página no extiste</h1>
      <Link to="/">
        Volver al inicio
      </Link>
    </div>
  )
}

export default NotFound;