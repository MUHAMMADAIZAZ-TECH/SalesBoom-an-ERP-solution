import React, { useState, useContext } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {
    AppBar,
    Toolbar,
    Typography,
    Button
} from "@material-ui/core";

import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import Profile from '../ui/profile/Profile';
import AuthContext from '../../context/auth/AuthContext';
import Logo from '../../assets/logo-updated.png';
import clsx from 'clsx';
// import './header.css'

function Header(props) {
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1
        },
        title: {
            flexGrow: 1
        },
        userProfile: {
            marginRight: "5rem"
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
    }));

    const classes = useStyles();

    const authContext = useContext(AuthContext);
    const {
        user,
        userLogOut,
        profileFlag,
        showProfile
    } = authContext;

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <AppBar
                position="fixed" className={clsx(classes.appBar, {[classes.appBarShift]: props.open,})} 
            >
                <Toolbar>
                    <div style={{display:'flex', flexGrow:'1'}}>
                        <div
                            style={{
                                width: '40px',
                                height: '40px',
                                // backgroundColor: '#bbdefb',
                                borderRadius: '100%',
                                marginLeft:'240px'
                                // padding:'5px',
                            }}
                        >
                            <img
                                src={Logo}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'inline-block',
                                    // backgroundColor: 'gray',
                                    backgroundImage: 'inherit'
                                }}
                            />
                        </div>
                        <div style={{marginTop:'5px', marginLeft:'5px'}}>
                            {
                                user !== null ?
                                    <Typography variant="h5" className={classes.title}>
                                        {/* <img src={Logo} alt='Project Tracker Logo' width='100px' height='100px' /> */}
                                        {user.designation !== 'admin' ? user.organization : 'App Tracker'}
                                    </Typography> :
                                    null
                            }
                        </div>
                    </div>


                     <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={ () => {
                                handleClose()
                                showProfile()
                            } }>
                            <PersonIcon/>
                                {
                                 user !== null ?
                                    `${user.firstName} ${user.lastName}`
                                     :null
                                }
                            </MenuItem>
                            <MenuItem
                                onClick={ () => {
                                    handleClose()
                                    userLogOut()
                                } }
                                startIcon={<ExitToAppIcon/>}
                            >
                            <ExitToAppIcon />
                                    Log Out
                            </MenuItem>
                        </Menu>
                        </div>


                       
                    </Toolbar>
                {/* </div> */}
            </AppBar>
            {profileFlag && <Profile />}
        </div>
    );
}

export default Header;
