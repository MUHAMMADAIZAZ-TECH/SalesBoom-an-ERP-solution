import {useContext, useReducer} from 'react'
import AlertContext from './AlertContext'
import AlertReducer from './AlertReducer'
import {
    ALERT,
    REMOVE_ALERT,
    SET_LOADING
} from '../Type'

const AlertStates = props => {

    const initialState = {
        alertMessage: null,
        type: null,
        loading: false
    }

    const [state, dispatch] = useReducer(AlertReducer, initialState)
    
    const setMessage = (msg, type) => {
        // console.log(msg, type)
        let alert = null;
        
        switch (msg) {
            case "auth/network-request-failed":
                alert = 'An unxpected network error occured! Please check your device is connected to a network';
                break;
            
            case 'auth/invalid-email':
                alert = 'Invalid Email Address!';
                break;
            
            case 'Please enter all fields':
                alert = 'Make sure all the fields are correctly entered!';
                break;
                        
            case "auth/wrong-password":
                alert = "The password is invalid!";
                break;
                case "Filed is Empty":
                    alert = "Filed is Empty!";
                    break;
            case "auth/user-not-found":
                alert = "User not found!";
                break;
            case "Please Select an Item":
                alert = "Please Select an Item!";
                break;
                
            case "auth/email-already-in-use":
                alert = "Email Already in use! Please use another valid email address";
                break;
            
            case 'title':
                alert = 'Organization title should not be empty or greater than mentioned limit!';
                break;
            
            case 'empty keys':
                alert = 'Get the organization keys first!';
                break;
            
            case 'organization added':
                alert = 'Organization Added';
                break;
            
            case 'Invoice Created':
                alert = 'Added Succesfully';
                break;
            case 'Project Updated':
                alert = 'Updated Successfully';
                break;
            case 'phone':
                alert = 'Please Enter Valid Phone Number';
                break;
            case 'address':
                alert = 'Please Enter Address';
                break;    
            case 'Project Deleted':
                alert = 'Successfully Deleted';
                break;
            case 'Payment':
                alert = 'Please Select Payment type';
                break;
            case 'Product':
                alert = 'Please Enter Correct Product Details';
                break;
            case 'name':
                alert = 'Name is not Valid';
                break;    
            case 'User updated':
                alert = 'Member Updated';
                break;
            
            case 'signed up':
                alert = 'User Registered Successfully! Please click the verification link send to the registered email';
                break;
            
            case 'password reset mail sent':
                alert = 'Email has been sent to your registered email account. Please proceed to reset password'
                break;
            
            case 'email not verified':
                alert = 'Your email is not verified. Please click the link sent on time of registeration to verify'
                break;
            
            default:
               alert='unexpected error occured!' 
        }
        dispatch({type: ALERT, payload: {alert, type}})
    }

    const removeAlert = (interval = 3000) => {
        setTimeout(() => {
            dispatch({type:REMOVE_ALERT})
        }, interval)
    }

    const toggleLoading = (flag) => {
        dispatch({type:SET_LOADING, payload: flag})
    }

    return (
        <AlertContext.Provider
            value={ {
                alertMessage: state.alertMessage,
                type: state.type,
                loading: state.loading,
                setMessage,
                removeAlert,
                toggleLoading
            }}
        >
            {props.children}
        </AlertContext.Provider >
    )
};

export default AlertStates;

