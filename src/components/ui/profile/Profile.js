import React, { useContext } from 'react';
import {
    Typography
} from '@material-ui/core';
import {
    makeStyles
} from '@material-ui/core/styles';
import Modal from '../modal/ModalWindow'
import AuthContext from '../../../context/auth/AuthContext'

function Profile() {

    const authContext = useContext(AuthContext);
    const {
        user,
        closeProfile
    } = authContext;

    const useStyles = makeStyles((theme) => ({
        margin: {
            margin: '10px'
        }
    }));

     const classes = useStyles();


    return (
       <Modal show={true} clicked={closeProfile}>
            <Typography className={classes.margin} variant='h5' component='h2' color='primary'>
                {`${user.firstName} ${user.lastName}`}
            </Typography>
            < Typography className = {classes.margin}
                variant = 'h6'
                component = 'p' >
                {user.designation}
            </ Typography>
            <Typography className={classes.margin} variant='h6' component='p'>
                {user.email}
            </Typography>
            <Typography className={classes.margin} variant='h6' component='p'>
                {user.organization}
            </Typography>
            <Typography className={classes.margin} variant='h6' component='p'>
                Reg Date {user.regDate}
            </Typography>
        </Modal>

    )
}

export default Profile
