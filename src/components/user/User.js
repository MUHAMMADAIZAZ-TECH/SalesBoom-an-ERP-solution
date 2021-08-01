import React from 'react'
import {Route, Switch, useRouteMatch} from 'react-router-dom'
import AddCustomer from '../ui/Pages/UserPages/Customer/AddCustomer';
import ManageCustomer from '../ui/Pages/UserPages/Customer/ManageCustomer';
import AddSales from '../ui/Pages/UserPages/Sales/AddSales';
import ManageSales from '../ui/Pages/UserPages/Sales/ManageSales';
import ProductList from '../ui/Pages/UserPages/ProductList/ProductList';
import DashboardScreen from './DashboardScreen';
import './user.css'

function User() {
    const route = useRouteMatch();
    const path = route.path
 
    return (
        <>
                <Switch>
                <Route path={`${path}`} exact component={DashboardScreen} />
                <Route path={`${path}/AddCustomer`} component={AddCustomer} />
                <Route path={`${path}/ManageCustomer`} component={ManageCustomer} />
                <Route path={`${path}/AddSales`} component={AddSales} />
                 <Route path={`${path}/ManageSales`} component={ManageSales} />
                 <Route path={`${path}/ProductList`} component={ProductList} />
                </Switch>
        </>
    )
}

export default User
