import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/Create';

function UpdateButton({clicked}) {
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
      <IconButton onClick={clicked} aria-label="edit" color='primary' className={classes.margin}>
        <CreateIcon />
      </IconButton>
    )
}

export default UpdateButton;
