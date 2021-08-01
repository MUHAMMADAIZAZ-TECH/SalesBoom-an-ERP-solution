import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
          margin: theme.spacing(2),
          width: '29ch',
        },
      },
      container: {
        margin: theme.spacing(1),
        padding: theme.spacing(4),
      },
      box:{
        minWidth: 350,
        maxWidth: 250,
        height: 150

      }
    }));
function Cards(props) {
    const classes = useStyles();

    return (
        <Card className={classes.box} >
                <CardContent  className={classes.container}>
                <Typography variant="h6" component="h6" color="secondary">{props.title}</Typography>
                <Typography variant="h6" component="h6" color="primary">{props.amount}</Typography>
                </CardContent>
        </Card>
    );
}

export default Cards;