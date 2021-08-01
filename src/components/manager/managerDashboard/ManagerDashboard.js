import React, { useContext, useEffect,useState } from 'react';
import ManagerContext from '../../../context/manager/ManagerContext'
import { Button } from '@material-ui/core';
import { Link, useRouteMatch } from 'react-router-dom';
import Manager from '../Manager'
import Header from '../../header/Header';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
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
import DashboardIcon from '@material-ui/icons/Dashboard';
import Paper from '@material-ui/core/Paper'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import StoreIcon from '@material-ui/icons/Store';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import clsx from 'clsx';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import Profile from '../../ui/profile/Profile';
import Logo from '../../../assets/logo-updated.png';
import AuthContext from '../../../context/auth/AuthContext';
import Grid from '@material-ui/core/Grid'
const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
      },
      appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
        marginRight: 36,
      },
      hide: {
        display: 'none',
      },
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
      },
      drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      drawerClose: {
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9) + 1,
        },
      },
      toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
      },
}));

function ManagerDashboard(props) {
  const classes = useStyles();
  const theme = useTheme();
    const managerContext = useContext(ManagerContext)
    const {
        getCustomers,
        getPurchaseInvoices,
        getSupliers,
        getCategories,
        getSalesInvoice,
        getProducts,
    } = managerContext

    const route = useRouteMatch();
    const path = route.path;
    const [open, setOpen] = React.useState(false);
    const authContext = useContext(AuthContext);
    const {
        user,
        userLogOut,
        profileFlag,
        showProfile
    } = authContext;

    const [anchorEl, setAnchorEl] = useState(null);
    const Open = Boolean(anchorEl);
    
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        getCustomers()
        getProducts()
        getCategories()
        getSalesInvoice()
        getPurchaseInvoices()
        getSupliers()
    }, [])
  const List1 = [{Text:'Dashboard',url:`${path}`,icon:<DashboardIcon/>},
  {Text:'Add Purchases',url:`${path}/AddPurchases`,icon:<AttachMoneyIcon/>},
  {Text:'Manage Purchases',url:`${path}/ManagePurchases`,icon:<EditIcon/>},
  {Text:'Add Sales',url:`${path}/AddSales`,icon:<AttachMoneyIcon/>},
  {Text:'Manage Sales',url:`${path}/ManageSales`,icon:<EditIcon/>},
  {Text:'Add Suplier',url:`${path}/AddSuplier`,icon:<TransferWithinAStationIcon/>},
  {Text:'Manage Suplier',url:`${path}/ManageSuplier`,icon:<EditIcon/>},
  {Text:'Add Customer',url:`${path}/AddCustomer`,icon:<EmojiPeopleIcon/>},
  {Text:'Manage Customer',url:`${path}/ManageCustomer`,icon:<EditIcon/>},
  {Text:'Categories',url:`${path}/Categories`,icon:<StoreIcon/>},
  {Text:'Add Products',url:`${path}/AddProducts`,icon:<StoreIcon/>},
  {Text:'Manage Products',url:`${path}/ManageProducts`,icon:<EditIcon/>}]

  
    return (
        <>  
        <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => {
              setOpen(true);
            }}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <div style={{display:'flex', flexGrow:'1'}}>
                        <div
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '100%',
                            }}
                        >
                            <img
                                src={Logo}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'inline-block',
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
                            open={Open}
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
      </AppBar>
    
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={() => {
      setOpen(false);
    }}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {List1.map((text, index) => (
            <ListItem button key={index} component={Link} to={text.url}>
              <ListItemIcon>{text.icon}</ListItemIcon>
              <ListItemText primary={text.Text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Paper style={{ display: 'flex',flexDirection:"row" ,marginBottom: 10,justifyContent: 'space-between' }}>
          <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
          <List>
              <Link className='link'   to={`${path}/SalesTaxReport`}>
                  <ListItem button>
                      <ListItemIcon>
                          <AssessmentIcon/>
                      </ListItemIcon>
                      <ListItemText className='link-text' primary={'Sales Tax Report'} />
                  </ListItem>
              </Link>
          </List>
                </Grid>
                <Grid item xs={12} sm={3}>
                <List>
              <Link className='link'   to={`${path}/PurchaseTaxReport`}>
                  <ListItem button>
                      <ListItemIcon>
                      <AssessmentIcon/>
                      </ListItemIcon>
                      <ListItemText className='link-text' primary={'Purchase Tax Report'} />
                  </ListItem>
              </Link>
          </List>
                </Grid>
                <Grid item xs={12} sm={3}>
                <List>
              <Link className='link'   to={`${path}/SalesReport`}>
                  <ListItem button>
                      <ListItemIcon>
                      <AssessmentIcon/>
                      </ListItemIcon>
                      <ListItemText className='link-text' primary={'Sales Report'} />
                  </ListItem>
              </Link>
          </List>
                </Grid>
                <Grid item xs={12} sm={3}>
          <List>
              <Link className='link'   to={`${path}/PurchaseReport`}>
                  <ListItem button>
                      <ListItemIcon>
                      <AssessmentIcon/>
                      </ListItemIcon>
                      <ListItemText className='link-text' primary={'Purchase Report'} />
                  </ListItem>
              </Link>
          </List>
                </Grid>
            </Grid>
                </Paper>
                <Paper>
                <Manager/>
                </Paper>
      </main>
    </div>
        </>
    );
}

export default ManagerDashboard;
