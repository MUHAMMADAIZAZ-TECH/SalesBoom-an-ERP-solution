import React, { useEffect, useState,useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import ManagerContext from '../../../../../context/manager/ManagerContext';
import { DataGrid ,GridToolbar} from '@material-ui/data-grid';
const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  button: {
    display: "flex",
    justifyContent:"flex-end",
  }
}));
const ProductList = (props) => {
    const managerContext = useContext(ManagerContext);
    const {
        productList,
        getProducts
    } = managerContext;
 
      const Columns = [
        { field: 'id',headerName: 'id',width: 10, hide: true},
        { field: 'ProductName',headerName: 'Product Name',width: 200,editable: true},
        { field: 'Model',headerName: 'Model',width: 200,editable: true},
        { field: 'SalePrice',headerName: 'Sale Price',width: 200,editable: true},
        { field: 'Category',headerName: 'Category',width: 200,editable: true},
        { field: 'ProductDetail',headerName: 'Product Detail',width: 200,editable: true},
        { field: 'Suplier',headerName: 'Suplier',width: 200,editable: true},
        { field: 'SuplierPrice',headerName: 'Suplier Price',width: 200,editable: true},
      ];
 
    const classes = useStyles();
      useEffect(() => {
        getProducts()
        return () => {
          getProducts()
          };
    }, []);
    return (
    <div>
        <Container maxWidth="lg" className={classes.container}>
          <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={productList} columns={Columns} 
            components={{
              Toolbar: GridToolbar,
            }}/>
          </div>
        </Container>
        </div>
    );
}

export default ProductList;