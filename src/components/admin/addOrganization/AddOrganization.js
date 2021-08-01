import React, { useContext, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Grid,
  ButtonGroup,
  Button
} from '@material-ui/core';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import AdminContext from '../../../context/admin/AdminContext';
import AuthContext from '../../../context/auth/AuthContext';
import Database from '../../../config/Database';
import AlertContext from '../../../context/alerts/AlertContext'

function AddOrganization() {
  const adminContext = useContext(AdminContext);
  const {
    registerOrganization
  } = adminContext;

  const alertContext = useContext(AlertContext);
  const {
    setMessage
  } = alertContext;

  const authContext = useContext(AuthContext);
  const {
    currentDate
  } = authContext;

  const [organizationValid, setOrganizationValid] = useState(false);
  const [organization, setOrganization] = useState('');
  const handleOrganization = e => {
    setOrganization(e.target.value);
    setOrganizationValid(validate(/^[a-zA-Z0-9 ]{0,30}$/g, e.target.value))
  }

  const [emailValid, setEmailValid] = useState(false);
  const [orgEmail, setOrgEmail] = useState('');
  const handleOrgEmail = e => {
    setOrgEmail(e.target.value);
    setEmailValid(validate(/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/g, e.target.value));
  }


  const [contactValid, setContactValid] = useState(false);
  const [contact, setContact] = useState('');
  const handleContact = e => {
    setContact(e.target.value);
    setContactValid(validate(/^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/g, e.target.value))
  }

  const [addressValid, setAddressValid] = useState(false);
  const [address, setAddress] = useState('');
  const handleAddress = e => {
    setAddress(e.target.value);
    setAddressValid(validate(/^[A-Za-z0-9 ,.#\/-]*$/g, e.target.value))
  }

  const [isKey, setIsKey] = useState(false)
  const [organizationKey, setOrganizationKey] = useState('');
  const [managerKey, setManagerKey] = useState('');
  const [SalesCounterKey, setSalesCounterKey] = useState('');

  const getKeys = () => {
    
    let organizationKey = Database.database().ref('/organizations/').push().key;
    setOrganizationKey(organizationKey);
    
    setIsKey(false)
    
    let manager = generateKey(organizationKey);
    let SalesCounter = generateKey(organizationKey);

    if ((manager !== SalesCounter)) {
      setManagerKey(manager);
      setSalesCounterKey(SalesCounter);
      return 0;
    } else {
      getKeys();
    }
    // return organizationKey;
  };

  const generateKey = (key) => {
    key = key.replace(/-/g, '');
    key = key.replace(/_/g, '');
    let designationKey = '';
    let possible = key;

    for (let i = 0; i < 5; i++) {
      designationKey += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return designationKey;
  };

  let date = currentDate();

  const organizationData = {
    id: organizationKey,
    name: organization,
    address: address,
    contact: contact,
    email: orgEmail,
    regDate: date,
    organizationKeys: {
      [managerKey]: {
        designation: 'manager',
        key: managerKey
      },
      [SalesCounterKey]: {
        designation: 'SalesCounter',
        key: SalesCounterKey
      },
    }
  };

  const validate = (pattern, field) => {
    let regex = new RegExp(pattern);
    if (regex.test(field)) {
      return true;
    } else {
      return false;
    }
  };


  const register = () => {

    if (organization && orgEmail && contact && address && managerKey && SalesCounterKey) {
      registerOrganization(organizationData)
  
      setOrganization('');
      setOrganizationKey('')
      setOrgEmail('')
      setContact('')
      setAddress('')
      setSalesCounterKey('')
      setManagerKey('')
    } else {
      if (organization && orgEmail && contact && address && managerKey === '' && SalesCounterKey === '') {
        setIsKey(true);
        setMessage('empty keys', 'error');
      } else {
        setMessage('Please enter all fields', 'error');
      }
    }
  };
  
  const clear = () => {
    setOrganization('');
    setOrganizationKey('')
    setOrgEmail('')
    setContact('')
    setAddress('')
    setSalesCounterKey('')
    setManagerKey('')
  }

  return (
    // <div>
    <Container
      maxWidth="md"
      style={{
        marginTop: '10px',
        height: '80vh'
      }}
    >
      <Typography variant='h5'>
        Add Organization
        </Typography>
      <form noValidate autoComplete='off'>

        <TextField
          id="organizationName"
          label='Oraganization Name'
          value={organization}
          fullWidth={true}
          margin='normal'
          variant="outlined"
          error={!organizationValid && organization !== ''}
          helperText={!organizationValid && organization !== '' ? 'Max characters should be 22 / no special characters are allowed' : null}
          onChange={handleOrganization}
        />

        <TextField
          id="organizationEmail"
          label='Email Address'
          value={orgEmail}
          fullWidth={true}
          margin='normal'
          variant="outlined"
          error={orgEmail !== '' & !emailValid}
          helperText={orgEmail !== '' & !emailValid ? 'email pattern : username@domain.com' : null}
          onChange={handleOrgEmail}
        />

        <TextField
          id="contact"
          label='Contact No'
          fullWidth={true}
          value={contact}
          margin='normal'
          variant="outlined"
          error={!contactValid && contact !== ''}
          helperText={!contactValid && contact !== '' ? 'contact pattern : 03231234567 / 0345-1234567 / +923211234567 / 0092-3331234567' : null}
          onChange={handleContact}
        />

        <TextField
          id="address"
          label='Address'
          fullWidth={true}
          value={address}
          margin='normal'
          variant="outlined"
          error={address !== '' && !addressValid}
          helperText={address !== '' && !addressValid ? 'Special characters : !, @, $, %, ^, &, *, are not allowed' : null}
          onChange={handleAddress}
        />

        <Grid container justify='center' spacing={1}>
          <Grid item sm='12' md='3' lg='3'>
            <TextField
              id="managerKey"
              label='Manager Key'
              fullWidth={true}
              disabled
              error={isKey}
              value={managerKey}
              margin='normal'
              variant="outlined"
              />
          </Grid>
          <Grid item sm='12' md='3' lg='3'>
            <TextField
              id="SalesCounterKey"
              label='Sales Counter Key'
              fullWidth={true}
              disabled
              value={SalesCounterKey}
              error={isKey}
              margin='normal'
              variant="outlined"
              />
          </Grid>
          <Grid item sm='12' md='12' lg='12' xl='12' xs='12' justify='center'
          >
            <Button
              variant='outlined'
              fullWidth={true}
              onClick={getKeys}
              style={{
                marginTop: '10px'
              }}
              startIcon={<VpnKeyIcon/>}
            >
              Get Keys
            </Button>
          </Grid>
        </Grid>

        <ButtonGroup
          variant='contained'
          fullWidth={true}
          style={{
            marginTop: '20px'
          }}
        >
          <Button
            color='primary'
            onClick={() => register()}
            startIcon={<AddIcon/>}
            >
            Register
          </Button>
          <Button
            color='secondary'
            onClick={clear}
            startIcon={<CloseIcon/>}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </form>
    </Container>
    // </div> 
  );
}

export default AddOrganization;
