import React, { useEffect, useState,useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button';
import ManagerContext from '../../../../../context/manager/ManagerContext';
import AuthContext from '../../../../../context/auth/AuthContext';
import AlertContext from '../../../../../context/alerts/AlertContext';
import { Typography } from '@material-ui/core';
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
const ManageCustomer = (props) => {
const managerContext = useContext(ManagerContext);
  const {
    customersList,
    getCustomers,
    deleteAllCustomers,
    EditCustomer,
    deleteCustomer,
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
    { field: 'id', headerName: 'id', width: 50,hide: true },
    { field: 'Name',headerName: 'Name',width: 250,editable: true},
    { field: 'Email',headerName: 'Email',width: 250,editable: true},
    { field: 'Phone',headerName: 'Phone', width: 150,editable: true},
    { field: 'Address',headerName: 'Address', width: 150,editable: true},
    { field: 'Country',headerName: 'Country', width: 200,editable: true},
    { field: 'City',headerName: 'City', width: 120,editable: true},
    { field: 'PreviousBalance',headerName: 'Previous Balance', width: 200,editable: true},
  ];
   
      const [Customer,setCustomer] = useState('')
      const [id,setId] = useState('')
    const classes = useStyles();
     
      const Remove = (key) => {
        if(key){
          deleteCustomer(key)
             getCustomers()
             setId("")
             setCustomer("")
        }
        else{
          setMessage("Please Select an Item","error")
        }
         
        }
    const RemoveAll = () => {
      deleteAllCustomers()
      }

    const Update = (key,value) => {
      if(key && value){
        EditCustomer(key,value)
        getCustomers()
        setId("")
        setCustomer("")
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
        return () => {
          };
    }, []);
   
    return (
        <Container maxWidth="lg" className={classes.container}>
           <Typography variant="h6" component="h6" color="secondary">Manage Customer</Typography> 
        <div className={classes.button}>
          <Button color="secondary" variant="contained" size="small" onClick={() => Remove(id)}>Delete</Button>
          <Button color="primary" variant="contained" size="small" onClick={()=>RemoveAll()}>Delete All</Button>
          <Button  color="secondary" variant="contained" size="small"  onClick={()=>Update(id,Customer)} >Save Changes</Button>
         </div>
          <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={customersList} columns={Columns} 
          onRowSelected={(e) => {
            setCustomer(e.data)
            setId(e.data.id)}}
            components={{
              Toolbar: GridToolbar,
            }}
            editRowsModel={editRowsModel}
            onEditRowModelChange={handleEditRowModelChange}/>
          </div>
        </Container>
    );
}

export default ManageCustomer;

