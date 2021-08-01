import React,{useContext,useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ProductList from '../ui/Pages/UserPages/ProductList/ProductList';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ManagerContext from '../../context/manager/ManagerContext';
import Card from '../manager/managerDashboard/Card'
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
      const [TotalCustomer,setTotalCustomer] = useState(0)
      const [TotalSuplier,setTotalSuplier] = useState(0)
      const [TotalCategory,setTotalCategory] = useState(0)
      const [TotalProducts,setTotalProducts] = useState(0)
      const [TotalSalesTransaction,setTotalSalesTransaction] = useState(0)
    const Calculate = () =>{
        if(PurchaseInvoicesList && SalesInvoicesList && 
            customersList && supliersList && categorieslist && productList){
            setTotalSalesTransaction(SalesInvoicesList.length)
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
        getSupliers()
      setTimeout(()=>{
        Calculate()
      },2000)
        return () =>{
            getCustomers()
            getProducts()
            getCategories()
            getSalesInvoice()
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
                <Card title={"Total Customer"} amount={TotalCustomer}/>
                </Grid>
                <Grid item xs={12}sm={4}>
                <Card title={"Total Supliers"} amount={TotalSuplier}/>
                </Grid>
                <Grid item xs={12}sm={4}>
                <Card title={"Total Categories of Product"} amount={TotalCategory}/>
                </Grid>
                <Grid item xs={12}sm={4}>
                <Card title={"Total Products"} amount={TotalProducts}/>
                </Grid>
                <Grid item xs={12}sm={4}>
                <Card title={"Total Sales Transactions"} amount={TotalSalesTransaction}/>
                </Grid>
              
                </Grid>
            </Container>
        </div>
    );
}

export default DashboardScreen;