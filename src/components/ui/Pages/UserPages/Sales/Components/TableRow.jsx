import React, { useEffect, useState,useContext} from 'react';
import TextField from '@material-ui/core/TextField';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from "@material-ui/icons/Delete";
import { Edit } from '@material-ui/icons';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import ManagerContext from '../../../../../../context/manager/ManagerContext';
import AuthContext from '../../../../../../context/auth/AuthContext';
import AlertContext from '../../../../../../context/alerts/AlertContext';
import { makeStyles ,useTheme} from '@material-ui/core/styles';
import { FormControl, InputLabel, MenuItem, Select} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  table: {
      minWidth: 700,
    },
  root: {
      '& > *': {
        width: '35ch',
      },
    },
    field: {
      '& > *': {
        width: '20ch',
      },
    },
    container: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
    main: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  }));
  
 const CreateTable = ({row, handleDataChange, deleteRow,refresh}) => {
  const managerContext = useContext(ManagerContext);
  const {
    productList,
  } = managerContext;

  const authContext = useContext(AuthContext);
  const {
      currentDate
  } = authContext;

  const alertContext = useContext(AlertContext);
  const {
      setMessage
  } = alertContext;
   const theme = useTheme();
   const classes = useStyles()

   const index = row.index;
   const [textfiled,settextfiled] = useState(false);
   const [Products,setProducts] = useState([])
   const [disabled,setdisabled] = useState(false)
   const [state, setState] = useState({
            index: index,
            Name: "",
            Qty: "",
            Rate: "",
            Discount: "",
            Sum: 0,
          })
    const handleChange = (evt) => {
      const value = evt.target.value
      var ProductList = [...Products]
      var ProductIndex = ProductList.findIndex(x => x.ProductName === value);
      const ProductObj = Products[ProductIndex]
      if(ProductIndex === -1){
        setState({
          ...state,
          [evt.target.name]: value
        });
      }
      else{
        setState({
          ...state,
          Name: ProductObj.ProductName,
          Rate: ProductObj.SalePrice,
        })
       
       }
          }
    function ccyFormat(num) {
    return `${num.toFixed(2)}`;
    }
          
   const removeRow = () => {
      deleteRow(index)
   }
   const reset = () =>{
     setState(
       {...state,
        Name: "",
        Qty: "",
        Rate: "",
        Discount: "",
        Sum: 0,
     })
   }
   const validate = (state) =>{
    const errors = {};
    let isValid = true;
    if(state.Discount !== '' & !Number(state.Discount )){
      errors.Discount = true;
      isValid = false;
    }
    if(state.Rate !== '' & !Number(state.Rate )){
      errors.Rate = true;
      isValid = false;
    }
    if(state.Qty !== '' & !Number(state.Qty )){
      errors.Qty = true;
      isValid = false;
    }
    if(ccyFormat(state.Sum) !== '' & !Number(ccyFormat(state.Sum) )){
      errors.Sum = true;
      isValid = false;
    }
    return { errors, isValid }
  }
  if(disabled){
   const { errors,isValid } = validate(state)
    if(isValid){
      handleDataChange(state)
    }
    else{
      console.log(errors)
    }
 }
   useEffect(() => {
     setProducts(productList)
    reset()
     return ()=>{
      setProducts(productList)
     }
   },[refresh])
   useEffect(() => {
    const setdata = () => {
      var Total = 0;
      var Dis = 0;
      var Sum = 0;
      Total += (state.Qty *state.Rate);
      Dis = (state.Discount /100)
      Sum = Total -(Total * Dis)
      setState({
        ...state,Sum: Sum
      })  
     }
     setdata()
  }, [state.Discount,state.Qty,state.Rate])
   return(
       <>
        <TableRow>
               <TableCell >
                 {textfiled?
                 <div className={classes.root}>
                   <TextField required label="Product Name"
                 onDoubleClick={()=>{settextfiled(!textfiled)}}
                 disabled={disabled} size="small" name="Name" value={state.Name} onChange={handleChange}/>
                   </div>
                :<div className={classes.root}>
                  <FormControl required>
                  <InputLabel id="Product">Product Name</InputLabel>
                  <Select labelId="Product"
                        onDoubleClick={()=>{settextfiled(!textfiled)}}
                        id="Product"
                        value={state.Name}
                        name="Name"
                        onChange={handleChange}>
                        {Products.length>0?Products.map((option) => (
                        <MenuItem key={option.key} value={option.ProductName}>{option.ProductName}</MenuItem>
                        )):<MenuItem>data not found</MenuItem>}
                    </Select>
                  </FormControl>
                  </div>
                  }  
                </TableCell>
                <TableCell>
             <TextField required 
             label="Qty" 
             disabled={disabled} 
             size="small" 
             name="Qty"
              value={state.Qty} 
              onChange={handleChange}
              error={state.Qty !== ''& !Number(state.Qty )}
              helperText={state.Qty !== '' &  !Number(state.Qty ) ? 'Invalid Field' : ''}/>
              
                   </TableCell>
               <TableCell>
             <TextField required 
             label="Rate" 
             disabled={disabled} 
              size="small"name="Rate"
               value={state.Rate}
                onChange={handleChange}
                error={state.Rate !== '' & !Number(state.Rate )}
                helperText={state.Rate !== '' & !Number(state.Rate )? 'Invalid Field' : ''}/>
               </TableCell>
               <TableCell>
             <TextField label="Discount" 
             disabled={disabled} 
             size="small" 
             name="Discount"
              value={state.Discount}
               onChange={handleChange}
               error={state.Discount !== '' & !Number(state.Discount )}
                helperText={state.Discount !== '' & !Number(state.Discount ) ? 'Invalid Field' : ''}/>
               </TableCell>
               <TableCell>
             <TextField required label="sum" size="small"disabled={true} name="Sum" 
             value={ccyFormat(state.Sum)}
           />
               </TableCell>
             <TableCell>
                 {disabled?  <PlaylistAddCheckIcon onClick={() => {
                setdisabled(!disabled)
              }} color="secondary"size="small"/>:
                 <Edit color="secondary" onClick={() => {
                  setdisabled(!disabled)
                }}size="small"/>
                    }
             </TableCell>
             <TableCell>
               <DeleteIcon color="secondary" onClick={removeRow} size="small"/>
             </TableCell>
             </TableRow>
       </>
     
   )
}

export default CreateTable;