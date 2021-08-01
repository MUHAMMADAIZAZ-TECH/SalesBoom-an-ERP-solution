import React, { useState,useEffect ,useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddIcon from '@material-ui/icons/Add';
import Row from './TableRow'
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button'
import ManagerContext from '../../../../../../context/manager/ManagerContext';
import AuthContext from '../../../../../../context/auth/AuthContext';
import AlertContext from '../../../../../../context/alerts/AlertContext';
import TextField from '@material-ui/core/TextField'
import { Typography } from '@material-ui/core';
var tableRowIndex = 0;

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
          width: '36ch',
        },
      },
      Paper:{
        padding:20
      }
    }));


  const CreateTable = ({Details,callBack}) => {
  const [refresh, doRefresh] = useState(0);    
  const [PreviousBalance,setPreviousBalance] = useState(0)
  const [taxrate,settaxrate] = useState(0)
  const [invoiceTaxes,setinvoiceTaxes] = useState(0)
  const [invoiceSubtotal,setinvoiceSubtotal] = useState(0)
  const [invoiceTotal,setinvoiceTotal] = useState(0)
  const [talbeRows, setRows] = useState([{
         index: 0,
         Name: "",
         Qty: 0,
         Rate: 0,
         Discount: 0,
         Sum: 0,
      }
   ]);

   const managerContext = useContext(ManagerContext);
   const {
     setOpenPdf,openPdf,
     Invoicedata,
     InvoiceData,
     createSalesInvoice,
     EditSalesInvoice,
     getSalesInvoice,
   } = managerContext;

   const authContext = useContext(AuthContext);
   const {
       currentDate
   } = authContext;

   const alertContext = useContext(AlertContext);
   const {
       setMessage
   } = alertContext;

 const tax = (e) =>{
 var value = e.target.value;
 settaxrate(value)
 var taxvalue =((value / 100) * invoiceSubtotal)
 console.log(taxvalue)
 setinvoiceTaxes(taxvalue)
  }
   // Receive data from TableRow 
   const handleChange = data => {
      talbeRows[data.index] = data
      setinvoiceSubtotal(subtotal(talbeRows))
      setPreviousBalance(Number(Details.PreviousBalance))
      setinvoiceTotal(Math.round(invoiceTaxes + invoiceSubtotal + PreviousBalance));

   }
   const SaveAll = () =>{
     const key = Details.InvoiceNo;
     const object = {
      InvoiceNo: key,
      ProductsDetails:[...talbeRows],
      taxrate:taxrate,
      invoiceTaxes:invoiceTaxes,
      invoiceSubtotal: invoiceSubtotal,
      invoiceTotal:invoiceTotal,
      Name: Details.Name,
      Email: Details.Email,
      Phone: Details.Phone,
      Address: Details.Address,
      PaymentType: Details.PaymentType,
      PreviousBalance: Details.PreviousBalance,
      SubmissionDate: new Date().toLocaleString(),
      Date: Details.Date,
     }
     const validateProducts = object.ProductsDetails.every(item =>
       item.Name && item.Qty && item.Rate && item.Sum);
      console.log(validateProducts)
    
     const {errors,isvalid} = Validation(object)
     console.log(errors,isvalid)
     if((!isvalid || !validateProducts) || (!isvalid && !validateProducts)){
      setMessage("Please enter all fields","error")
     }
     else{
          if(Invoicedata && Invoicedata.length>0){
              EditSalesInvoice(key, object)
              setOpenPdf(!openPdf)
              reset() 
              doRefresh(prev => prev + 1)
              callBack(true)
              setPreviousBalance(0)
              setinvoiceTotal(0)
              InvoiceData(null)
            }
            else{
              createSalesInvoice(object)
              setOpenPdf(!openPdf)
              getSalesInvoice()
              reset() 
              doRefresh(prev => prev + 1)
              callBack(true)
            }
     }
   
   }
   const Validation = (state) =>{
    let isvalid = true;
   let errors = {}
     if(!validate(/[a-zA-Z]{3}/g, state.Name) && state.PaymentType=="" && state.Address==""){
       isvalid = false;
       errors.Name = true;
      
     }
     if(!validate(/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/g, state.Email)){
       isvalid = false;
       errors.Email = true;
       setMessage("auth/invalid-email","error")
     }
    if((!validate(/^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/g, state.Phone))){
     isvalid = false;
     errors.Phone = true;
     setMessage("phone","error")
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
   // Add New Table Row
   const addNewRow = () => {
      tableRowIndex = parseFloat(tableRowIndex) + 1
      const updatedRows =[...talbeRows]
      console.log(updatedRows.length+1)
      updatedRows.push({
        index: updatedRows.length,
        Name: "",
        Qty: 0,
        Rate: 0,
        Discount: 0,
        Sum: 0,
      })
      setRows(updatedRows)
   }
   // Remove Table row if rows are count is more than 1
   const deleteRow = (index) => {
      if(talbeRows.length > 1){
         var updatedRows = [...talbeRows]
         var indexToRemove = updatedRows.findIndex(x => x.index === index);
         if(indexToRemove > -1){
            updatedRows.splice(indexToRemove, 1)
            setRows(updatedRows);
         }
      }
   }
   const classes = useStyles();
   function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }
  
  function subtotal(items) {
    return items.map(({ Sum }) => Sum).reduce((sum, i) => sum + i, 0);
  }
  const reset = () =>{
    setPreviousBalance(0)
    settaxrate(0)
    setinvoiceTaxes(0)
    setinvoiceSubtotal(0)
    setinvoiceTotal(0)
  }

  useEffect(()=>{

  },[])
  return (
    <div>
      <TableContainer>
      <Table className={classes.table} size="small" aria-label="spanning table" >
        <TableHead >
          <TableRow >
            <TableCell style={{ fontWeight: 'bold'}}>Product Name</TableCell>
            <TableCell style={{ fontWeight: 'bold'}}align="center" >Qty.</TableCell>
            <TableCell style={{ fontWeight: 'bold'}}align="center" >Rate</TableCell>
            <TableCell style={{ fontWeight: 'bold'}}align="center" >Discount</TableCell>
            <TableCell style={{ fontWeight: 'bold'}}align="center" >Sum</TableCell>
            <TableCell >
            </TableCell>
            <TableCell>
            <AddIcon onClick={addNewRow} color="primary"size="small"></AddIcon>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {talbeRows.map((row, index) => {
                     if(row)
                     return(
                        <Row key={index} row={row} handleDataChange={handleChange} deleteRow={deleteRow} refresh={refresh}></Row>
                     )
                  })
               }
            
          <TableRow>
          <TableRow>
          <TableCell>
          <Typography variant="h6" component="h6"gutterBottom color="primary">Tax</Typography></TableCell>
            <TableCell >   
               <TextField required label="Tax"variant="outlined" size="small" color="primary" value={taxrate} onChange={tax}/>
            </TableCell>
            <TableCell/>
          </TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>
            <Typography variant="h6" component="h6"gutterBottom color="primary">Subtotal</Typography></TableCell>
            <TableCell >
            <TextField required label="Subtotal"variant="outlined" disabled={true} size="small" color="primary" value= {ccyFormat(invoiceSubtotal)}/>
             </TableCell>
          </TableRow>
        
        </TableBody>
      </Table>
    </TableContainer>
    <Paper className={classes.Paper} >
    <div style={{display: "flex", justifyContent:"space-between", }}>
      <div>
      <Typography variant="h6" component="h6"gutterBottom color="primary">Total Amount of Tax</Typography>
    <Typography variant="h6" component="h6"gutterBottom color="secondary">{ccyFormat(invoiceTaxes)}</Typography>
      </div>
      <div>
    <Typography variant="h6" component="h6"gutterBottom color="primary">Previous Balance </Typography>
    <Typography variant="h6" component="h6"gutterBottom color="secondary">{PreviousBalance}</Typography>
    </div>
    <div>
    <Typography variant="h6" component="h6"gutterBottom color="primary">Grand Total </Typography>
    <Typography variant="h6" component="h6"gutterBottom color="secondary">{ccyFormat(invoiceTotal)}</Typography>
    </div>

    <div style={{ marginTop:60  }}>
    <Button onClick={SaveAll}  variant="contained" color="primary"size="small" 
            startIcon={<SaveIcon/>}>Save</Button>
    </div>
    </div>
    </Paper></div>
    
  );
}


  export default CreateTable