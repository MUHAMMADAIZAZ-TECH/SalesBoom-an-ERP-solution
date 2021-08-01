import React,{useContext,useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PurchaseReport from '../../ui/Pages/ManagerPages/Reports/PurchaseReport';
import SalesReport from '../../ui/Pages/ManagerPages/Reports/SalesReport';
import SalesTaxReport from '../../ui/Pages/ManagerPages/Reports/SalesTaxReport';
import PurchasesTaxReport from '../../ui/Pages/ManagerPages/Reports/PurchasesTaxReport';
import ProductList from '../../ui/Pages/UserPages/ProductList/ProductList';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ManagerContext from '../../../context/manager/ManagerContext';
import Card from './Card'
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
          margin: theme.spacing(2),
          width: '29ch',
        },
      },
      container: {
        padding: theme.spacing(4),
      },
      box:{
        minWidth: 350,
        maxWidth: 250,
        height: 150

      }
    }));
    
function DashboardScreen(props) {
    const managerContext = useContext(ManagerContext);
    const {
        categorieslist,
        productList,
        SalesInvoicesList,
        PurchaseInvoicesList,
        customersList,
        supliersList,
        getProducts,
        getCustomers,
        getCategories,
        getSalesInvoice,
        getPurchaseInvoices,
        getSupliers,
    } = managerContext;
      const [PurchaseTotal,setPurchasesTotal] = useState({
        Total: 0,
        TotalTax:0
      })
      const [SaleTotal,setSaleTotal] = useState({
        Total: 0,
        TotalTax:0
      })
      const [TotalCustomer,setTotalCustomer] = useState(0)
      const [TotalSuplier,setTotalSuplier] = useState(0)
      const [TotalCategory,setTotalCategory] = useState(0)
      const [TotalProducts,setTotalProducts] = useState(0)
      const [TotalPurchaseTransaction,setTotalPurchaseTransaction] = useState(0)
      const [TotalSalesTransaction,setTotalSalesTransaction] = useState(0)
      function subtotal(items) {
        return {
           Total: items.map(({ invoiceTotal }) => invoiceTotal).reduce((invoiceTotal, i) => invoiceTotal + i, 0),
           TotalTax :items.map(({ invoiceTaxes }) => invoiceTaxes).reduce((invoiceTaxes, i) => invoiceTaxes + i, 0),
           length: items.length
        };
      }
    
    const Calculate = () =>{
       
        if(PurchaseInvoicesList && SalesInvoicesList && 
            customersList && supliersList && categorieslist && productList){
            setPurchasesTotal(subtotal(PurchaseInvoicesList))
            setTotalPurchaseTransaction(PurchaseInvoicesList.length)
            setTotalSalesTransaction(SalesInvoicesList.length)
            setSaleTotal(subtotal(SalesInvoicesList))
            setTotalCustomer(customersList.length)
            setTotalSuplier(supliersList.length)
            setTotalCategory(categorieslist.length)
            setTotalProducts(productList.length)
        } 
    }
        
    const classes = useStyles();
    useEffect(()=>{
       
        getCustomers()
        getProducts()
        getCategories()
        getSalesInvoice()
        getPurchaseInvoices()
        getSupliers()
      setTimeout(()=>{
        Calculate()
      },3000)
        return () =>{
            getCustomers()
            getProducts()
            getCategories()
            getSalesInvoice()
            getPurchaseInvoices()
            getSupliers()
          setTimeout(()=>{
            Calculate()
          },2000)
        }
    },[])
    return (
        <div>
             <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                <Card title={"Total Sale Amount"} amount={SaleTotal.Total}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                <Card title={"Total Sales Taxes"} amount={SaleTotal.TotalTax}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                <Card title={"Total Purchases Amount"} amount={PurchaseTotal.Total}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                <Card title={"Total Purchases Taxes"} amount={PurchaseTotal.TotalTax}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                <Card title={"Total Customer"} amount={TotalCustomer}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                <Card title={"Total Supliers"} amount={TotalSuplier}/>
                </Grid>
                <Grid item xs={12}sm={4}>
                <Card title={"Total Categories of Product"} amount={TotalCategory}/>
                </Grid>
                <Grid item xs={12}sm={4}>
                <Card title={"Total Products"} amount={TotalProducts}/>
                </Grid>
                <Grid item xs={12}sm={4}>
                <Card title={"Total Purchases Transactions"} amount={TotalPurchaseTransaction}/>
                </Grid>
                <Grid item xs={12}sm={4}>
                <Card title={"Total Sales Transactions"} amount={TotalSalesTransaction}/>
                </Grid>
                <Grid item xs={12} sm={12}>
                {SaleTotal.Total?<SalesReport/>:null}
                </Grid>
                <Grid item xs={12}sm={12}>
                {SaleTotal.TotalTax? <SalesTaxReport/>:null}
                </Grid>
                <Grid item xs={12}sm={12}>
                {PurchaseTotal.Total?<PurchaseReport/>:null}
                </Grid>
                <Grid item xs={12}sm={12}>
                {PurchaseTotal.TotalTax?<PurchasesTaxReport/>:null}
                </Grid>
                <Grid item xs={12}sm={12}>
                {TotalProducts?<ProductList/>:null}
                </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default DashboardScreen;