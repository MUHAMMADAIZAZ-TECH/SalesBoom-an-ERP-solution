import React, { useState ,useEffect,useContext} from 'react';
import { makeStyles ,useTheme} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import { FormControl, InputLabel, MenuItem, Select} from '@material-ui/core';
import ManagerContext from '../../../../../context/manager/ManagerContext';
import AuthContext from '../../../../../context/auth/AuthContext';
import AlertContext from '../../../../../context/alerts/AlertContext';
import CreateTable from './Components/Table';
import Button from '@material-ui/core/Button'
import FlipToFrontIcon from '@material-ui/icons/FlipToFront';
import {PDFViewer} from '@react-pdf/renderer'
import Invoice from '../../../PdfViewer/Invoice'
import Input from '@material-ui/core/Input';
import {
  Link
} from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 700,
      },
    root: {
        '& > *': {
          width: '33ch',
        },
      },
      field: {
        '& > *': {
          width: '20ch',
        },
      },
      container: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
      },
      main: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      DatePicker: {
        marginLeft: theme.spacing(1),
        width: 230,
        height:50
      },
    }));
    
const EditSales = () => {
  const managerContext = useContext(ManagerContext);
  const {
    customersList,
    Invoicedata,
    openPdf,
    setOpenPdf,
    SalesInvoice
  } = managerContext;

  const authContext = useContext(AuthContext);
  const {
      currentDate
  } = authContext;

  const alertContext = useContext(AlertContext);
  const {
      setMessage
  } = alertContext;
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
    const [reload, setReload] = useState(false);
    const [Customers,setCustomers] = useState([]) 
  
   
    const [state, setState] = useState({
        Name: "",
        Email: "",
        Phone: "",
        Address: "",
        InvoiceNo: 0,
        PaymentType: "",
        PreviousBalance:0,
        Date: ""
      })
      const setvalues = () =>{
        if(Invoicedata){
            setState({
                ...state,
                Name:Invoicedata.Name,
                Email: Invoicedata.Email,
                Phone: Invoicedata.Phone,
                Address: Invoicedata.Address,
                Date: Invoicedata.Date,
                PaymentType: Invoicedata.PaymentType,
                PreviousBalance: Invoicedata.PreviousBalance,
                InvoiceNo: Invoicedata.InvoiceNo
            })
        }
    }
    const classes = useStyles();
    const theme = useTheme();
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };
    const [emailValid, setEmailValid] = useState(true);
    const [PhoneValid, setPhoneValid] = useState(true);
    const [AddressValid, setAddressValid] = useState(true);
    const [Balance, setBalance] = useState(true);
    const handleChange = (evt) => {
        const value = evt.target.value
        var CustomersList = [...Customers]
        var CustomersIndex = CustomersList.findIndex(x => x.Name === value);
        const CustomersObj = Customers[CustomersIndex]
        if(CustomersIndex === -1){
          if(evt.target.name==="Name"){
            setState({
              ...state,
              Name: value
            });
          }
          if(evt.target.name==="Email"){
            setEmailValid(validate(/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/g, value));
            setState({
              ...state,
              Email: value
            });
          }
        
          if(evt.target.name==="Phone"){
            setPhoneValid(validate(/^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/g, value));
            setState({
              ...state,
              Phone: value
            });
          }
        
          if(evt.target.name==="Address"){
            if(typeof evt.target.value === "string"){
              console.log(typeof value)
              setState({
                ...state,
                Address: value
              });
              setAddressValid(true)
            }
            else{
              setAddressValid(false)
            }
          }
          if(evt.target.name==="PreviousBalance"){
            console.log(Number(value) )
            if(Number(value)){
              setState({
                ...state,
                PreviousBalance: value
              });
              setBalance(true)
            }
            else{
              setState({
                ...state,
                PreviousBalance: value
              });
              setBalance(false)
            }
          }
         
          if(evt.target.name==="PaymentType"){
              setState({
                ...state,
                PaymentType: value
              });
          }

       }
       else{
        setState({
          ...state,
          Name: CustomersObj.Name,
          Email:CustomersObj.Email,
          Phone: CustomersObj.Phone,
          Address: CustomersObj.Address,
          PreviousBalance: CustomersObj.PreviousBalance,
        })
       
       }
      }
      const validate = (pattern, field) => {
        let regex = new RegExp(pattern);
        if (regex.test(field)) {
          return true;
        } else {
          return false;
        }
      };
      useEffect(() => {
        setCustomers(customersList)
         setvalues()
        return () => {
          setCustomers(customersList)
          };
    }, [reload,Invoicedata]);
    return (
        <> 
          {
        openPdf && SalesInvoice? 
        <Container maxWidth="lg" className={classes.container}>
          <Button color="primary" size="small" onClick={()=>{setOpenPdf(false)}} component={Link} to={"/dashboard/ManageSales"}>
        <FlipToFrontIcon />
        </Button>
        <div style={{ 
          display:"flex",
          justifyContent:"center",
          alignItems:"center",}}>    
            <PDFViewer width="1100" height="1200" >
                <Invoice invoice={SalesInvoice}/>
            </PDFViewer>
        </div>
        </Container>:<Container maxWidth="lg" className={classes.container}>
        <Typography variant="h6" component="h6" color="secondary">Edit Invoice</Typography> 
        <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
            <div className={classes.root}>
              <FormControl>
              <InputLabel id="Customers">Customer</InputLabel>
              <Select labelId="Customers"
                    id="Customers"
                    value={state.Name}
                    name="Name"
                    input={<Input />}
                    MenuProps={MenuProps}
                    onChange={handleChange}>
                    {Customers.length>0?Customers.map((option) => (
                    <MenuItem style={getStyles(option.Name, state.Name, theme)} key={option.key} value={option.Name}>{option.Name}</MenuItem>
                    )):<MenuItem>data not found</MenuItem>}
                    <MenuItem value={"New Customer"}>New Customer</MenuItem>
                </Select>
              </FormControl>
            </div>
            </Grid>
            <Grid item xs={12} sm={3}>
          <TextField required label="Email"
           fullWidth 
           name="Email" 
           value={state.Email}  
           onChange={handleChange}
           error={state.Email !== '' & !emailValid}
           helperText={state.Email !== '' & !emailValid ? 'email pattern : username@domain.com' : ''}/>
          </Grid>
          <Grid item xs={12} sm={2}>
          <TextField required 
          label="Phone" 
          fullWidth name="Phone" 
          value={state.Phone} 
          onChange={handleChange}
          error={state.Phone !== '' & !PhoneValid}
          helperText={state.Phone !== '' & !PhoneValid ? 'Phone pattern : 030025343323' : ''}/>
          </Grid>
            <Grid item xs={12} sm={2}>
            <TextField required label="Invoice No" disabled={true} fullWidth value={state.InvoiceNo} name="InvoiceNo" onChange={handleChange}/>
            </Grid>
            <Grid item xs={12} sm={2}>
            <div className={classes.field}>
              <FormControl>
              <InputLabel id="PaymentType">Payment Type</InputLabel>
              <Select labelId="PaymentType"
                    id="PaymentType"
                    value={state.PaymentType}
                    name="PaymentType"
                    onChange={handleChange}>
                    <MenuItem value="CashPayment">Cash Payment</MenuItem>    
                    <MenuItem value="BankPayment">Bank Payment</MenuItem>
                </Select>
              </FormControl>
            </div>
            </Grid>
            <Grid item xs={6}>
          <TextField required 
          label="Address"
           fullWidth name="Address" 
           value={state.Address} 
           onChange={handleChange}
           error={state.Address !== '' & !AddressValid}
          helperText={state.Address !== '' & !AddressValid ? 'Please Enter String' : ''}/>
          </Grid>
          <Grid item xs={3}>
          <TextField required label="Date" fullWidth name="Date" value={state.Date}/>
          </Grid>   
          <Grid item xs={3}>
          <TextField label="Previous Balance"
           fullWidth name="PreviousBalance"
            value={state.PreviousBalance} 
            onChange={handleChange} 
            error={!Balance}
            helperText={!Balance ? 'Please Enter Number' : ''}/>
          </Grid>
            <Grid item xs={12}>
          <CreateTable Details={state} callBack={setReload}/>
            </Grid>
            </Grid>
        </Container>  }
        
        </>
    );
}
export default EditSales;