import React, { useEffect, useState ,useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container'
import FlipToFrontIcon from '@material-ui/icons/FlipToFront';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import ManagerContext from '../../../../../context/manager/ManagerContext';
import AuthContext from '../../../../../context/auth/AuthContext';
import AlertContext from '../../../../../context/alerts/AlertContext';
import {PDFViewer} from '@react-pdf/renderer'
import Invoice from '../../../PdfViewer/Invoice'
import {Link,useHistory} from 'react-router-dom';
import { DataGrid ,GridToolbar} from '@material-ui/data-grid';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  button: {
    display: "flex",
    justifyContent:"flex-end"
  }
}));
const ManagePurchases = () => {
  History = useHistory()
  const managerContext = useContext(ManagerContext);
  const {
    openPdf,
    setOpenPdf,
    getPurchaseInvoices,
    PurchaseInvoice,
    PurchaseInvoicesList,
    InvoiceData,
    deleteAllPurchaseInvoices,
    deletePurchaseInvoices
  } = managerContext;

  const authContext = useContext(AuthContext);
  const {
      currentDate
  } = authContext;

  const alertContext = useContext(AlertContext);
  const {
      setMessage
  } = alertContext;
  const Columns = [
    { field: 'id', headerName: 'Invoice No', width: 200 },
    { field: 'Name',headerName: 'Name',width: 400,},
    { field: 'Date',headerName: 'Created on',width: 300,},
    { field: 'invoiceTotal',headerName: 'Total Amount', width: 200,},
  ];
      
  const [invoice,setinvoice] = useState('')
  const [id,setId] = useState('')
  const classes = useStyles();
  
  const Remove = async (key) => {
    if(key){
      deletePurchaseInvoices(key)
      setId("")
    }
    else{
      setMessage("Please Select an Item","error")
    }
    }
  const HandleEdit = () =>{
  if(id!==""){
    History.push(`${id}/editpurchasesinvoice/`);
  }
  else{
    setMessage("Please Select an Item","error")
  }
  }
  const HandlePdf = () =>{
    if(id!==""){
      setOpenPdf(true)
    }
    else{
      setMessage("Please Select an Item","error")
    }
    
  }
  useEffect(() => {
    getPurchaseInvoices()
    return () => {
      getPurchaseInvoices()
      };
}, []);
    return (
      <div>
         {
        openPdf && invoice? 
        <Container maxWidth="lg" className={classes.container}>
          <Button color="primary" size="small" onClick={()=>{setOpenPdf(false)}}>
     <FlipToFrontIcon />
     </Button>
     <div style={{ 
          display:"flex",
          justifyContent:"center",
          alignItems:"center",}}>    
            <PDFViewer width="1100" height="1200" >
                <Invoice invoice={invoice}/>
            </PDFViewer>
        </div>
       </Container>: <Container maxWidth="lg" className={classes.container}>
       <Typography variant="h6" component="h6" color="secondary">Manage Purchases</Typography> 
         <div className={classes.button}>
         <Button color="primary" size="small"variant="contained" onClick={HandlePdf}><PictureAsPdfIcon /></Button>
          <Button color="secondary"  size="small" variant="contained" onClick={() => Remove(id)}>Delete</Button>
          <Button  color="secondary"  size="small" variant="contained" onClick={HandleEdit}>Edit</Button>
          <Button color="primary" variant="contained" size="small" onClick={()=>deleteAllPurchaseInvoices()}>Delete All</Button>
         </div>
         
           <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={PurchaseInvoicesList} columns={Columns} 
          onRowSelected={(e) => {
            InvoiceData(e.data)
            setinvoice(e.data)
            setId(e.data.id)}}
            components={{
              Toolbar: GridToolbar,
            }}
           />
          </div>
        </Container>}
   
        </div>
    );
}


export default (ManagePurchases)
