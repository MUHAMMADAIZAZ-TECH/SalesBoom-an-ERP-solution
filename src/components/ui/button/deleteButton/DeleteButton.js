import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

function DeleteButton({clicked}) {
    // console.log(clicked);
    const useStyles = makeStyles((theme) => ({
        margin: {
          margin: theme.spacing(1),
        },
        extendedIcon: {
          marginRight: theme.spacing(1),
        },
      }));
        
      const classes = useStyles();

    return (
        <IconButton onClick={clicked} aria-label="edit" color='secondary' className={classes.margin}>
          <DeleteIcon />
        </IconButton>
    )
}

export default DeleteButton;
