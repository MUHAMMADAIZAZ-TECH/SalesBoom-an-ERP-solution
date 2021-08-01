import React, { useEffect, useState ,useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import ManagerContext from '../../../../../context/manager/ManagerContext';
import AuthContext from '../../../../../context/auth/AuthContext';
import AlertContext from '../../../../../context/alerts/AlertContext';
import { FormControl,InputLabel ,TextareaAutosize} from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
          width: '35ch',
        },
      },
      textarea:{
        '& > *': {
          width: '55ch',
        },
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
      container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
      },
    }));
    
const AddProduct = (props) => {
    const managerContext = useContext(ManagerContext);
    const {
        categorieslist,
        getCategories,
        supliersList,
        AddProducts,
        getSupliers
    } = managerContext;
 
    const authContext = useContext(AuthContext);
    const {
        currentDate
    } = authContext;
 
    const alertContext = useContext(AlertContext);
    const {
        setMessage
    } = alertContext;
    const [state, setState] = useState({
        ProductName: "",
        Model: "",
        SalePrice: "",
        Category:"",
        ProductDetail:"",
        Suplier: "",
        SuplierPrice:""
      })
      const [Supliers, setSupliers] = useState([])
      const [Category, setCategory] = useState([])
    const classes = useStyles();
    const handleChange = (evt) => {
        const value = evt.target.value
        setState({
          ...state,
          [evt.target.name]: value
        });
      } 
      let time = null
      const [Errors,SetErrors] = useState({})
      const handleClick = () =>{
        const {errors,isvalid} = Validation(state)
        console.log(errors,isvalid)
        if(isvalid){
          AddProducts(state)
       }
       else{
         SetErrors(errors)
         setMessage("Please enter all fields","error")
       }
      time =  setInterval(() => {
          setState({
            ProductName: "",
            Model: "",
            SalePrice: "",
            Category:"",
            ProductDetail:"",
            Suplier: "",
            SuplierPrice:""
          })
          SetErrors({})
          }, 5000)
        
      }
     
      const Validation = (state) =>{
        let isvalid = true;
       let errors = {}
         if(state.ProductName==""){
           isvalid = false;
           errors.ProductName = true;
          }
          if(state.Model==""){
            isvalid = false;
            errors.Model = true;
           }
           if(state.Category==""){
            isvalid = false;
            errors.Category = true;
           }
           if(state.SalePrice==""){
            isvalid = false;
            errors.SalePrice = true;
         }
         if(!Number(state.SalePrice)){
          isvalid = false;
          errors.SalePrice = true;
       }
           
          if(state.ProductDetail==""){
           isvalid = false;
           errors.ProductDetail = true;
          }
          if(state.Suplier==""){
            isvalid = false;
            errors.Suplier = true;
           }
           if(state.SuplierPrice==""){
              isvalid = false;
              errors.SuplierPrice = true;
           }
           if(!Number(state.SuplierPrice)){
            isvalid = false;
            errors.SuplierPrice = true;
         }
         
      return {errors,isvalid}
       }
      useEffect(() => {
        getCategories()
        getSupliers()
      setSupliers(supliersList)
     setCategory(categorieslist)
     
        return () => {
           clearInterval(time)
          };
    }, []);
    return (
        <div>
       <Container maxWidth="lg" className={classes.container}>
       <Typography variant="h6" component="h6" color="secondary">Add Product</Typography> 
       <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
          <TextField
           required 
           variant="outlined" 
           label="Product Name"
           fullWidth  
           name="ProductName" 
           value={state.ProductName} 
           onChange={handleChange}
           error={Errors.ProductName}
           helperText={Errors.ProductName ? 'Field Invalid' : ''}
           />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField 
          required 
          variant="outlined" 
          label="Model"
          fullWidth 
          name="Model" 
          value={state.Model} 
          onChange={handleChange}
          error={Errors.Model}
          helperText={Errors.Model ? 'Field Invalid' : ''}/>
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
           required 
           variant="outlined" 
           label="Sale Price"
           fullWidth name="SalePrice" 
           value={state.SalePrice}  
           onChange={handleChange}
           error={Errors.SalePrice}
           helperText={Errors.SalePrice ? 'Field Invalid' : ''}
           />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField 
          required 
          variant="outlined" 
          placeholder="Product Detail"
          fullWidth name="ProductDetail" 
          value={state.ProductDetail}
           onChange={handleChange}
           error={Errors.ProductDetail}
           helperText={Errors.ProductDetail ? 'Field Invalid' : ''}/>
        </Grid>
        <Grid item xs={12} sm={3}>
        <div className={classes.root}>
          <FormControl variant="outlined" error={Errors.Category}>
          <InputLabel id="Category">Category</InputLabel>
          <Select labelId="Category"
                id="Category"
                value={state.Category}
                name="Category"
                onChange={handleChange}
                >
                {Category.length>0? Category.map((option) => (
                <MenuItem key={option.key} value={option.Category}>{option.Category}</MenuItem>
                )):<MenuItem>data not found</MenuItem>}
            </Select>
            {Errors.Category && <FormHelperText>Please Select!</FormHelperText>}
          </FormControl>
        </div>
        </Grid>
        <Grid item xs={12} sm={3}>
        <div className={classes.root}>
          <FormControl variant="outlined"  error={Errors.Suplier}>
          <InputLabel id="Suplier">Suplier</InputLabel>
          <Select labelId="Suplier"
                id="Suplier"
                value={state.Suplier}
                name="Suplier"
                onChange={handleChange}
                helperText={Errors.Suplier ? 'Please Select' : ''}>
                {Supliers.length>0? Supliers.map((option) => (
                <MenuItem key={option.key} value={option.Name}>{option.Name}</MenuItem>
                )):<MenuItem>data not found</MenuItem>}
            </Select>
            {Errors.Suplier && <FormHelperText>please select!</FormHelperText>}
          </FormControl>
        </div>
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField 
          required 
          variant="outlined" 
          label="Suplier Price"
          fullWidth 
          value={state.SuplierPrice} 
          name="SuplierPrice" 
          onChange={handleChange}
          error={Errors.SuplierPrice}
          helperText={Errors.SuplierPrice ? 'Field Invalid' : ''}/>
        </Grid>
        <Grid item xs={12} sm={2}>
        <Button variant="contained" color="secondary" onClick={handleClick}>Add Product</Button>
        </Grid>
       </Grid>
       </Container>
        </div> 
    );
}

export default AddProduct;

