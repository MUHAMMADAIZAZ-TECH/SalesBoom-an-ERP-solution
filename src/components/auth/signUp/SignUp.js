import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import AuthContext from '../../../context/auth/AuthContext';
import AlertContext from '../../../context/alerts/AlertContext';
import AdminContext from '../../../context/admin/AdminContext';
import {
  makeStyles,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container
} from '@material-ui/core';
import '../auth.css';

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
    marginTop: theme.spacing(3),
  },
  grid: {
    marginBottom: theme.spacing(0),
  },
  submit: {
    margin: theme.spacing(1, 0, 0),
  },
}));

export default function SignUp(props) {

  const authContext = useContext(AuthContext);
  const {
    registerUser,
    isLoggedIn,
    getUserData,
    currentDate
  } = authContext;

  const alertContext = useContext(AlertContext);
  const {
    setMessage
  } = alertContext;

  const adminContext = useContext(AdminContext);
  const {
    organizations,
    getOrganizations
  } = adminContext;

  useEffect(() => {
    getUserData();
    if (isLoggedIn) {
      props.history.replace('/dashboard');
    }
  }, [isLoggedIn, props.history]);

  useEffect(() => {
    getOrganizations();
  }, []);

  const classes = useStyles();


  const [firstNameValid, setFirstNameValid] = useState(false);
  const [firstName, setFirstName] = useState('');
  const handleFirstName = e => {
    setFirstName(e.target.value);
    setFirstNameValid(validate(/[a-zA-Z]{2}/g, firstName));
  };

  const [lastNameValid, setLastNameValid] = useState(false);
  const [lastName, setLastName] = useState('');
  const handleLastName = e => {
    setLastName(e.target.value);
    setLastNameValid(validate(/[a-zA-Z]{2}/g, lastName));
  };

  const [emailValid, setEmailValid] = useState(false);
  const [email, setEmail] = useState('');
  const handleEmail = e => {
    setEmail(e.target.value);
    setEmailValid(validate(/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/g, email));
  };

  const [password, setPassword] = useState('');
  const handlePassword = e => setPassword(e.target.value);

  const [passwordValidate, setPasswordValidate] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleConfirmPassword = e => {
    setConfirmPassword(e.target.value);
    setPasswordValidate(!(e.target.value.length == password.length && checkPassword(password, e.target.value)));
  };

  const [softwareHouseKeyValid, setSoftwareHouseKeyValid] = useState(false);
  const [softwareHouseKey, setSoftwareHouseKey] = useState('');
  const handleSoftwareHouseKey = e => {
    setSoftwareHouseKey(e.target.value);
    if (validate(/[a-z0-9\-\_]{20}/gi, e.target.value)) {
      for (let i = 0; i < organizations.length; i++) {
        if (organizations[i].id === e.target.value) {
          setSoftwareHouseKeyValid(false);
          break;
        } else {
          setSoftwareHouseKeyValid(true);
        }
      }
    }
  };

  const [designationKeyValid, setDesignationKeyValid] = useState(false);
  const [designationKey, setDesignationKey] = useState('');
  const handleDesignationKey = e => {
    setDesignationKey(e.target.value);
    if (validate(/[a-z0-9]{4}/gi, e.target.value)) {
      for (let i = 0; i < organizations.length; i++) {
        if (organizations[i].id === softwareHouseKey) {
          const keyArr = Object.keys(organizations[i].organizationKeys);
          for (let i = 0; i < keyArr.length; i++) {
            if (keyArr[i] === e.target.value) {
              setDesignationKeyValid(false);
              break;
            } else {
              setDesignationKeyValid(true);
            }
          }
        }
      }
    }
  };

  const checkPassword = (password, confirmPassword) => {
    return password === confirmPassword ? true : false;
  };

  const validate = (pattern, field) => {
    let regex = new RegExp(pattern);
    if (regex.test(field)) {
      return true;
    } else {
      return false;
    }
  };

  const signUp = (e) => {
    e.preventDefault();

    if (firstName && lastName && email && password && designationKey && softwareHouseKey) {
      if (firstNameValid && lastNameValid && emailValid && !passwordValidate && !designationKeyValid && !softwareHouseKeyValid) {
        let userData = {
          firstName,
          lastName,
          email,
          password,
          softwareHouseKey,
          designationKey,
          regDate: currentDate()
        }; 

        registerUser(userData);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setSoftwareHouseKey('');
        setDesignationKey('');

      }
    } else {
      setMessage('Please enter all fields', 'error');
    }
  };
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
        ERP System
        </Typography>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h2" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate method='post'>
          <Grid className={classes.grid} container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={firstName}
                onChange={handleFirstName}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                error={firstName !== '' & !firstNameValid}
                helperText={firstName !== '' & !firstNameValid ? 'must be atleast 3 chars long' : ''}
                fullWidth
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={lastName}
                onChange={handleLastName}
                autoComplete="lname"
                error={lastName !== '' & !lastNameValid}
                helperText={lastName !== '' & !lastNameValid ? 'must be atleast 3 chars long' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type='email'
                id="email"
                value={email}
                onChange={handleEmail}
                label="Email Address"
                name="email"
                autoComplete="off"
                error={email !== '' & !emailValid}
                helperText={email !== '' & !emailValid ? 'email pattern : username@domain.com' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={handlePassword}
                autoComplete="off"
                error={password.length > 0 && password.length < 6}
                helperText={password.length > 0 && password.length < 6 ? 'password must be atleast 6 characters long' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPassword}
                error={passwordValidate}
                helperText={passwordValidate ? 'password must be same' : ''}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="softwareHouseKey"
                label="Organization Key"
                value={softwareHouseKey}
                onChange={handleSoftwareHouseKey}
                error={!(softwareHouseKey !== '' ? softwareHouseKey.length == 20 : true) || softwareHouseKeyValid}
                helperText={!(softwareHouseKey !== '' ? softwareHouseKey.length == 20 : true) || softwareHouseKeyValid ? 'invalid key intered / must be atleast 20 characters long' : ''}
                id="softwareHouseKey"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="designationKey"
                label="Designation Key"
                value={designationKey}
                onChange={handleDesignationKey}
                id="designationKey"
                error={!(designationKey !== '' ? designationKey.length == 5 : true) || designationKeyValid}
                helperText={!(designationKey !== '' ? designationKey.length == 5 : true) || designationKeyValid ? 'invalid key intered / must be atleast 5 characters long' : ''}
                autoComplete="off"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={e => signUp(e)}
          >
            Sign Up
            </Button>
          <Link className='link' to='/'>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </Link>
        </form>
      </div>
    </Container>
  );
}