import React from "react";
import {
  makeStyles,
  Fab
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

function AddButton({ clicked }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    }
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={clicked}>
        <AddIcon />
      </Fab>
    </div>
  );
}

export default AddButton;
