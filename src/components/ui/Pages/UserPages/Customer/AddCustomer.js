import React, { useState ,useEffect,useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography'
import ManagerContext from '../../../../../context/manager/ManagerContext';
import AuthContext from '../../../../../context/auth/AuthContext';
import AlertContext from '../../../../../context/alerts/AlertContext';
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
          margin: theme.spacing(2),
          width: '29ch',
        },
      },
      container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
      },
    }));
    
const AddCustomer = (props) => {
    const managerContext = useContext(ManagerContext);
    const {
      addCustomers,
    } = managerContext;
 
    const authContext = useContext(AuthContext);
    const {
        currentDate
    } = authContext;
 
    const alertContext = useContext(AlertContext);
    const {
        setMessage
    } = alertContext;
    const [state, setState] = useState({
        Name: "",
        Email: "",
        Phone: "",
        Address: "",
        Country: "",
        City: "",
        PreviousBalance:"",
      })
  
    const classes = useStyles();
    const handleChange = (evt) => {
        const value = evt.target.value
        setState({
          ...state,
          [evt.target.name]: value
        });
      }
      const Validation = (state) =>{
        let isvalid = true;
       let errors = {}
         if(!validate(/[a-zA-Z]{3}/g, state.Name)){
           isvalid = false;
           errors.Name = true;
         }
         if(!validate(/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/g, state.Email)){
           isvalid = false;
           errors.Email = true;
         }
        if((!validate(/^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/g, state.Phone))){
         isvalid = false;
         errors.Phone = true;
        }
         if(state.Country==""){
           isvalid = false;
           errors.Country = true;
          }
          if(state.City==""){
           isvalid = false;
           errors.City = true;
          }
         if(state.PreviousBalance!==""){
           if(!Number(state.PreviousBalance)){
             isvalid = false;
             errors.PreviousBalance = true;
            }
         }
          if(state.Address==""){
           isvalid = false;
           errors.Address = true;
          }
          return {errors,isvalid}
       }
       const validate = (pattern, field) => {
         let regex = new RegExp(pattern);
         if (regex.test(field)) {
           return true;
         } else {
           return false;
         }
       };
       const [Errors,SetErrors] = useState({})
       let time = null
      const handleClick = () =>{
        const {errors,isvalid} = Validation(state)
        console.log(errors,isvalid)
        if(isvalid){
          addCustomers(state)
          reset()
        }
        else{
          SetErrors(errors)
          setMessage("Please enter all fields","error")
        }
       time = setInterval(() => SetErrors({}), 5000)
      }
      const reset = () =>{
        setState({
          ...state,
          Name: "",
          Email: "",
          Phone: "",
          Address: "",
          Country: "",
          City: "",
          PreviousBalance:"",
        })
      }
      useEffect(() => {
        return () => {
          clearInterval(time)
          };
    }, []);
   
    return (
        <>
          <Container maxWidth="lg" className={classes.container}>
            <Typography variant="h6" component="h6" color="secondary">Add Customer</Typography> 
            <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <TextField 
                  required 
                  variant="outlined" 
                  label="Customer Name"
                  fullWidth name="Name" 
                  value={state.Name}
                   onChange={handleChange}
                   error={state.Name == '' & Errors.Name}
                   helperText={state.Name == '' & Errors.Name ? 'must be atleast 3 chars long' : ''}/>
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField 
                required 
                variant="outlined"
                 label="Email"
                  fullWidth name="Email" 
                  value={state.Email} 
                   onChange={handleChange}
                   error={Errors.Email}
                   helperText={Errors.Email ? 'Please Enter Correct Email' : ''}/>
                </Grid>
                <Grid item xs={12} sm={2}>
                <TextField 
                required 
                variant="outlined" 
                label="Country" 
                fullWidth name="Country" 
                value={state.Country} 
                onChange={handleChange}
                error={Errors.Country}
                helperText={Errors.Country ? 'Field is not valid' : ''}
                />
                </Grid>
                <Grid item xs={12} sm={2}>
                <TextField required 
                variant="outlined"
                 label="City" 
                 fullWidth name="City"
                  value={state.City} 
                  onChange={handleChange}
                  error={Errors.City}
                  helperText={Errors.City ? 'Field is not valid' : ''}/>
                </Grid>
                <Grid item xs={12} sm={2}>
                <TextField required 
                variant="outlined" 
                label="Phone" 
                fullWidth 
                name="Phone" 
                value={state.Phone} 
                onChange={handleChange}
                error={Errors.Phone}
                helperText={ Errors.Phone ? 'Field is not valid' : ''}/>
                </Grid>
                <Grid item xs={12} sm={2}>
                <TextField required
                 variant="outlined" 
                 label="Previous Balance" 
                 fullWidth value={state.PreviousBalance} 
                 name="PreviousBalance" 
                 onChange={handleChange}
                 error={Errors.PreviousBalance}
                 helperText={Errors.PreviousBalance ? 'Field is not valid' : ''}/>
                </Grid>
                <Grid item xs={12} sm={2}>
                <TextField 
                required 
                variant="outlined" 
                label="Address" 
                fullWidth name="Address" 
                value={state.Address} 
                onChange={handleChange}
                error={ Errors.Address}
                helperText={Errors.Address ? 'Field is not valid' : ''}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button variant="contained" color="secondary" onClick={handleClick}>Add Customer</Button>
                </Grid>
                </Grid>
            </Container>

        </> 
    );
}

export default AddCustomer;
