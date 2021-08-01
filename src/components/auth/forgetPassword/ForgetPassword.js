import React, {useState, useContext} from 'react';
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Typography,
    Container
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { Link } from 'react-router-dom';
import AuthContext from '../../../context/auth/AuthContext'
import AlertContext from '../../../context/alerts/AlertContext'
import '../auth.css'


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 0),
  },
}));

export default function SignIn() {

    const authContext = useContext(AuthContext);
    const { forgetPassword } = authContext;

    const alertContext = useContext(AlertContext);
    const { setMessage } = alertContext;

    const classes = useStyles();

    const [emailValid, setEmailValid] = useState(false);
    const [email, setEmail] = useState('');
    const handleEmail = e => {
        setEmail(e.target.value);
        setEmailValid(validate(/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/g, e.target.value));
    };

    const validate = (pattern, field) => {
        let regex = new RegExp(pattern);
        if (regex.test(field)) {
            return true;
        } else {
            return false;
        }
    };

    const resetPassword = (e) => {
        e.preventDefault()
        if (emailValid) {
            forgetPassword(email)
            setEmail('')
        } else {
            setMessage('auth/invalid-email', 'error')
        }
    }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h4'>
        ERP System
        </Typography>
        <Avatar className={classes.avatar}>
          <LockOpenIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <form className={classes.form} noValidate>
         <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="off"
            value={email}
            onChange={handleEmail}
            error={email !== '' & !emailValid}
            helperText={email !== '' & !emailValid ? 'email pattern : username@domain.com' : ''}
            autoFocus
          />

           <Link to='/' className = 'link'>
              <Typography
                color='primary'
                gutterBottom={ true }
                variant='subtitle2'
              >
                Sign In
              </Typography>
          </Link>
        
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={resetPassword}
          >
            Reset Password
          </Button>
        </form>
      </div>
    </Container>
  );
}

