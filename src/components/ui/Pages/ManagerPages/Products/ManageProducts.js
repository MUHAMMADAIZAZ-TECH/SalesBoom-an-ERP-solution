import React, { useEffect, useState,useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container'
import ManagerContext from '../../../../../context/manager/ManagerContext';
import AuthContext from '../../../../../context/auth/AuthContext';
import { Typography } from '@material-ui/core';
import AlertContext from '../../../../../context/alerts/AlertContext';
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
const ManageProduct = (props) => {
    const managerContext = useContext(ManagerContext);
    const {
        productList,
        EditProducts,
        deleteAllProducts,
        deleteProducts,
        getProducts
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
        { field: 'id',headerName: 'id',width: 10, hide: true},
        { field: 'ProductName',headerName: 'Product Name',width: 200,editable: true},
        { field: 'Model',headerName: 'Model',width: 200,editable: true},
        { field: 'SalePrice',headerName: 'Sale Price',width: 200,editable: true},
        { field: 'Category',headerName: 'Category',width: 200,editable: true},
        { field: 'ProductDetail',headerName: 'Product Detail',width: 200,editable: true},
        { field: 'Suplier',headerName: 'Suplier',width: 200,editable: true},
        { field: 'SuplierPrice',headerName: 'Suplier Price',width: 200,editable: true},
      ];
 
      const [Product,setProduct] = useState('')
      const [id,setId] = useState('')
    const classes = useStyles();
    const Remove = (key) => {
        if(key){
          deleteProducts(key)
          getProducts()
             setId("")
             setProduct("")
        }
        else{
          setMessage("Please Select an Item","error")
        }
      }
     
    const RemoveAll = () => {
      
      }
    const Update = (key,value) => {
        if(key && value){
          EditProducts(key,value)
          getProducts()
          setId("")
        }
        else{
          setMessage("Please Select an Item","error")
        }
    }
    const [editRowsModel, setEditRowsModel] = React.useState({});

    const handleEditRowModelChange = React.useCallback((params) => {
      setEditRowsModel(params.model);
    }, []);
      useEffect(() => {
    getProducts()
       
    }, []);
   
    
    return (
    <div>
        <Container maxWidth="lg" className={classes.container}>
        <Typography variant="h6" component="h6" color="secondary">Manage Products</Typography> 
      <div className={classes.button}>
       <Button color="primary"variant="contained" onClick={() => Remove(id)}>Delete</Button>
       <Button variant="contained" color="secondary" onClick={()=>  deleteAllProducts()} >Delete All</Button>    
      <Button variant="contained" color="primary" onClick={()=>Update(id,Product)}>Save Changes</Button>
      </div>
          <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={productList} columns={Columns} 
          onRowSelected={(e) => {
            setProduct(e.data)
            setId(e.data.id)
          }}
            components={{
              Toolbar: GridToolbar,
            }}
            editRowsModel={editRowsModel}
            onEditRowModelChange={handleEditRowModelChange}/>
          </div>
        </Container>
        </div>
    );
}

export default ManageProduct;