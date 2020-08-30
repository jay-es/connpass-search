import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Readme from './Readme';
import { RESULTS_STORAGE } from '../states/results';

const useStyles = makeStyles({
  h1: {
    flexGrow: 1,
  },
  helpIcon: {
    marginRight: -12,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    margin: 16,
    padding: 16,
    maxHeight: '90vh',
    overflowY: 'auto',
  },
});

const hasStorage = localStorage.getItem(RESULTS_STORAGE);

const Header: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(!hasStorage);

  return (
    <AppBar position="absolute">
      <Toolbar variant="dense">
        <Typography component="h1" variant="h6" className={classes.h1}>
          connpass.tokyo
        </Typography>
        <IconButton
          aria-label="Help"
          color="inherit"
          className={classes.helpIcon}
          onClick={() => setOpen(true)}
        >
          <HelpOutlineIcon />
        </IconButton>
      </Toolbar>
      <Modal className={classes.modal} open={open} onClose={() => setOpen(false)}>
        <Paper className={classes.paper}>
          <Readme />
          <Typography align="center">
            <Button variant="outlined" color="primary" onClick={() => setOpen(false)}>
              閉じる
            </Button>
          </Typography>
        </Paper>
      </Modal>
    </AppBar>
  );
};

export default Header;
