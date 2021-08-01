import React, { useEffect, useState ,useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import ManagerContext from '../../../../../context/manager/ManagerContext';
import { DataGrid ,GridToolbar} from '@material-ui/data-grid';
import { Typography } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  button: {
    display: "flex",
    justifyContent:"flex-end"
  },
  total:{
    display: "flex",
    justifyContent:"center"
    }
}));

const SalesReport = () => {
  const managerContext = useContext(ManagerContext);
  const {
    SalesInvoicesList,
    getSalesInvoice
  } = managerContext;
  const Columns = [
    { field: 'id', headerName: 'Invoice No', width: 200 },
    { field: 'Name',headerName: 'Customer Name',width: 400,},
    { field: 'Date',headerName: 'Created on',width: 300,},
    { field: 'invoiceTotal',headerName: 'Total Amount', width: 200,},
  ];
  const classes = useStyles();
  function subtotal(items) {
    return items.map(({ invoiceTotal }) => invoiceTotal).reduce((invoiceTotal, i) => invoiceTotal + i, 0);
  }
    useEffect(() => {
      getSalesInvoice()
      return () => {
        getSalesInvoice()
        };
  }, []);
    return (
      <div> 
     <Container maxWidth="lg" className={classes.container}>
      <Typography variant="h6" component="h6" color="secondary">Sales Report</Typography> 
      <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={SalesInvoicesList} columns={Columns} 
          components={{
            Toolbar: GridToolbar,
          }} />
          </div>
          <div className={classes.total}>
         <Typography component="h6" variant="h6" color="primary">Total Sales:  {subtotal(SalesInvoicesList)} </Typography>
          </div>
        </Container>
        </div>
    );
}


export default (SalesReport)
