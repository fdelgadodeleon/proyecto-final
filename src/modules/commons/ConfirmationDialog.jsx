// import Dialog from '@material-ui/core/Dialog/Dialog';
// import Button from '@material-ui/core/Button/Button';
// import DialogActions from '@material-ui/core/DialogActions/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent/DialogContent';
// import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
// import DialogContentText from '@material-ui/core/DialogContentText/DialogContentText'
// import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
// import { makeStyles } from '@material-ui/core'

import React from 'react';
import {
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  CircularProgress,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 50,
  },
  actionsContainer: {
    padding: theme.spacing(2, 3),
  }
}));

const ConfirmationDialog = ({ onClose, onConfirm, message, open, loading }) => {
  const classes = useStyles();

  function handleCancel() {
    onClose();
  }

  function handleOk() {
    onConfirm();
  }

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      aria-labelledby="confirmation-dialog-title"
      open={open}
    >
      <DialogTitle id="confirmation-dialog-title">Confirmación</DialogTitle>
      <DialogContent className={classes.container}>
        {!loading && <DialogContentText>{message}</DialogContentText>}
        {loading && <CircularProgress />}
      </DialogContent>
      <DialogActions className={classes.actionsContainer}>
        <Button autoFocus onClick={handleCancel} color="secondary">
          Cancelar
       </Button>
        <Button onClick={handleOk} color="primary">
          Aceptar
       </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
