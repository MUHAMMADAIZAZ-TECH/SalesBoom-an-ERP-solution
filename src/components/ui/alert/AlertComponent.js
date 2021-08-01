import {useContext, useEffect} from 'react'
import Modal from '../modal/ModalWindow'
import {
    makeStyles
} from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import AlertContext from '../../../context/alerts/AlertContext'

const useStyles = makeStyles((theme) => ({
    alert: {
        width: '100%',
        padding: '1rem',

        // margin: theme.spacing(2),
        fontSize: '18px',
        letterSpacing: '1px',
        fontWeight: '500',
        justifyContent: 'center'
    }
}));

const AlertComponent = () => {
    const alertContext = useContext(AlertContext)
    const {
        alertMessage,
        type,
        removeAlert
    } = alertContext;

    
    useEffect(() => {
        removeAlert()
    }, [])
    
    const color = type === 'error' ? '#ffebee' : '#f1f8e9';
    
    const classes = useStyles();

    return (
        <Modal show={ true } clicked={ () => removeAlert(0) }>
            <Alert 
                className={classes.alert} 
                variant="outlined" 
                severity={`${type}`}
                style={{backgroundColor: `${color}`}}
                >
                {alertMessage}
            </Alert>
        </Modal>
    )
}

export default AlertComponent;