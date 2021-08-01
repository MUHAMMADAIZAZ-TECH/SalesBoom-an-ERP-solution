import React, { useState, useContext } from 'react';
import AuthContext from '../../../context/auth/AuthContext';
import AdminContext from '../../../context/admin/AdminContext';
import { Link, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    AppBar,
    CssBaseline,
    Drawer,
    Hidden,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Toolbar,
    Typography
} from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PeopleIcon from '@material-ui/icons/People';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import MenuIcon from '@material-ui/icons/Menu';
import './adminDashboard.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    title: {
        flexGrow: 1,
        textAlign: 'left',
    },
}));

function ResponsiveDrawer(props) {

    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const route = useRouteMatch();
    const path = route.path;

    const authContext = useContext(AuthContext);
    const {
        userLogOut,
        user
    } = authContext;

    const adminContext = useContext(AdminContext);
    const {
        getOrganizations,
        getMembers
    } = adminContext;

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <List>
                <Link className='link' to='/dashboard'>
                    <ListItem button >
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Register'} />
                    </ListItem>
                </Link>
            </List>
            <List>
                <Link className='link' to={`${path}/view-organizations`} >
                    <ListItem
                        button
                        onClick={getOrganizations}
                    >
                        <ListItemIcon>
                            <HomeWorkIcon />
                        </ListItemIcon>
                        <ListItemText className='link-text' primary={'View Organizations'} />
                    </ListItem>
                </Link>
            </List>
            <List>
                <Link className='link' to={`${path}/view-members`}>
                    <ListItem 
                        button 
                        // onClick={getMembers}  //temporary commint
                    >
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary={'View Members'} />
                    </ListItem>
                </Link>
            </List>
            <List>
                <ListItem 
                    button 
                    onClick={userLogOut}
                >
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Logout'} />
                </ListItem>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;


    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar} >
                <Toolbar >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                        <Typography variant="h5" align='center' className={classes.title}>
                          EnterPrises Resourse Planing
                    </Typography>
                    <Typography variant="h6">
                            {user.name}
                        </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {props.children}
            </main>
        </div>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default ResponsiveDrawer;
