export const errorHandler = error => {
  if (error.response) {
    switch (error.response.code) {
      case 500:
        return "Hubo un error en el servidor";
        break;
      case 400:
        return "Hubo un error de validación";
        break;
        break;
      case 401:
        return "Usuario no autorizado";
        break;
      case 403:
        return "No tiene permisos";
        break;
      default:
        return "Hubo un error en la consulta";
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
    return "Hubo un error en la consulta";
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
    return "Hubo un error en la consulta";
  }
};
