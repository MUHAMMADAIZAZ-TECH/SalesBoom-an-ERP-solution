import React, { useEffect, useState ,useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import ManagerContext from '../../../../../context/manager/ManagerContext';
import AuthContext from '../../../../../context/auth/AuthContext';
import AlertContext from '../../../../../context/alerts/AlertContext';
import { FormHelperText } from '@material-ui/core';
import { FormControl,InputLabel,Select,MenuItem, TextField  } from '@material-ui/core';
import { DataGrid ,GridToolbar} from '@material-ui/data-grid';
const useStyles = makeStyles((theme) => ({
      input: {
        '& > *': {
          width: '20ch',
        },
        paddingBottom: theme.spacing(2),
      },
      container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
      },
      button: {
        display: "flex",
        flexDirection: "row",
        justifyContent:"flex-end",
      }
    }));
const Category = (props) => {
    const managerContext = useContext(ManagerContext);
    const {
        deleteCategory,
        addCategories,
        categorieslist,
        getCategories,
        deleteAllCategories,
        EditCategory
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
    { field: 'Category',headerName: 'Category',width: 550,editable: true},
    { field: 'Status',headerName: 'Status',width: 550,editable: true},
  ];const [categoryerror,setCategoryerror] = useState({})
    const [category,setcategory] = useState('')
    const [id,setId] = useState('')
    const [State, setState] = useState({
      Category: "",
      Status: "",
  }) 
  let timer = null;
    const classes = useStyles();
    const handleClick = () =>{
      const {errors,valid} = Validation(State)
        if(valid){
          addCategories(State)
          getCategories()
          reset()
        }
        else{
          setMessage("Filed is Empty","error")
          setCategoryerror(errors)
          timer = setInterval(() =>{
            reset()
            setCategoryerror({})
         }, 4000)
        }
       
      }

    const Remove = (key) => {
      if(key){
        deleteCategory(key)
          setId("")
      }
      else{
        setMessage("Please Select an Item","error")
      }
      }
     
    const reset = () => {
      setState({
        ...State,
        Category: "",
        Status: "",
    })
       
      }
    const handleChange = (evt) => {
      const value = evt.target.value
      setState({
        ...State,
        [evt.target.name]: value});
    }
    const Update = (key,value) => {
      if(key,value){
        EditCategory(key,value)
        getCategories()
        setId("")
        setcategory("")
      }
      else{
        setMessage("Please Select an Item","error")
      }
      
    }
    const Validation = (State) =>{
      var valid = true;
      var errors = {}
      if(State.Category ==""){
        valid= false;
        errors.Category = true;
      }
      if(State.Status ==""){
        errors.Status = true;
        valid= false;
      }
      return {valid,errors};
    }
    const [editRowsModel, setEditRowsModel] = React.useState({});

    const handleEditRowModelChange = React.useCallback((params) => {
      setEditRowsModel(params.model);
    }, []);
      useEffect(() => {
        return () => {
          clearInterval(timer)
          };
    }, []);
   
    
    return (
    <div>
        <Container maxWidth="lg" className={classes.container}>
        <Typography variant="h6" component="h6" color="secondary">Manage Categories</Typography> 
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <div className={classes.input}>
                <FormControl  error={State.Status=="" & categoryerror.Status}>
                <InputLabel id="Status">Status</InputLabel>
                <Select labelId="Status"
                    id="Status"
                    value={State.Status}
                    name="Status"
                    onChange={handleChange}>
                   <MenuItem value="In Active">In Active</MenuItem>
                    <MenuItem value="Active">Active</MenuItem>
                </Select>
                {State.Status=="" & categoryerror.Status? <FormHelperText>Please Select!</FormHelperText>:null}
                </FormControl>
             </div>
            </Grid>
            <Grid item xs={2}>
            <TextField label="Category" 
            name="Category" 
            value={State.Category} 
            onChange={handleChange}
            error={State.Category=="" & categoryerror.Category }
            helperText={State.Category=="" & categoryerror.Category? 'filed should not empty' : ''}/>
            </Grid>
            <Grid item xs={12} sm={8}>
         <div className={classes.button}>
          <Button variant="contained" color="primary" onClick={handleClick}>Add Category</Button>
         <Button variant="contained" color="secondary" onClick={()=> deleteAllCategories()} >Delete All</Button>
         <Button color="secondary" variant="contained" onClick={() => Remove(id)}>Delete</Button>
          <Button variant="contained" color="primary" onClick={()=>Update(id,category)}>Save Changes</Button>
          </div>
         </Grid>
         
          </Grid>
        
          <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={categorieslist} columns={Columns} 
          onRowSelected={(e) => {
            setcategory(e.data)
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

export default Category;