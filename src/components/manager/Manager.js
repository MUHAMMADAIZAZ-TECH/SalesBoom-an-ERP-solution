import React from 'react';
import {
    Route,
    Switch,
    useRouteMatch
} from 'react-router-dom';
import './manager.css';
import Dashboard from './managerDashboard/DashboardScreen'
import AddPurchases from '../ui/Pages/ManagerPages/purchases/AddPurchases'
import ManagePurchases from '../ui/Pages/ManagerPages/purchases/ManagePurchases';
import EditPurchase from '../ui/Pages/ManagerPages/purchases/EditPurchase'
import AddSuplier from '../ui/Pages/ManagerPages/Suplier/AddSuplier';
import ManageSuplier from '../ui/Pages/ManagerPages/Suplier/ManageSuplier'
import Categories from '../ui/Pages/ManagerPages/Categories/Categories'
import AddProducts from '../ui/Pages/ManagerPages/Products/AddProducts'
import ManageProducts from '../ui/Pages/ManagerPages/Products/ManageProducts'
import AddSales from '../ui/Pages/ManagerPages/Sales/AddSales';
import ManageSales from '../ui/Pages/ManagerPages/Sales/ManageSales';
import EditSale from '../ui/Pages/ManagerPages/Sales/EditSales'
import AddCustomer from '../ui/Pages/ManagerPages/Customers/AddCustomer';
import ManageCustomer from '../ui/Pages/ManagerPages/Customers/ManageCustomer';
import PurchaseTaxReport from '../ui/Pages/ManagerPages/Reports/PurchasesTaxReport'
import SalesTaxReport from '../ui/Pages/ManagerPages/Reports/SalesTaxReport'
import SalesReport from '../ui/Pages/ManagerPages/Reports/SalesReport'
import PurchaseReport from '../ui/Pages/ManagerPages/Reports/PurchaseReport'
function Manager() {

    const route = useRouteMatch();
    const path = route.path;

    return (
        <>
            {/* <Header />
            <div className='dashboard-container'> */}
                <Switch>
                    <Route path={`${path}`} exact component={Dashboard} />
                    <Route path={`${path}/PurchaseTaxReport`} component={PurchaseTaxReport} />
                    <Route path={`${path}/SalesTaxReport`} component={SalesTaxReport} />
                    
                    <Route path={`${path}/SalesReport`} component={SalesReport} />
                    <Route path={`${path}/PurchaseReport`} component={PurchaseReport} />

                    <Route path={`${path}/AddSales`} component={AddSales} />
                    <Route path={`${path}/ManageSales`} component={ManageSales} />

                    <Route path={`${path}/AddPurchases`} component={AddPurchases} />
                    <Route path={`${path}/ManagePurchases`} component={ManagePurchases} />

                    <Route path={`${path}/AddCustomer`} component={AddCustomer} />
                    <Route path={`${path}/ManageCustomer`} component={ManageCustomer} />

                    <Route path={`${path}/AddSuplier`} component={AddSuplier} />
                    <Route path={`${path}/ManageSuplier`} component={ManageSuplier} />

                    <Route path={`${path}/Categories`} component={Categories} />

                    <Route path={`${path}/AddProducts`} component={AddProducts} />
                    <Route path={`${path}/ManageProducts`} component={ManageProducts} />

                    <Route path={`${path}/:id/editsalesinvoice/`} component={EditSale} />
                    <Route path={`${path}/:id/editpurchasesinvoice/`} component={EditPurchase} />
                </Switch>
            {/* </div> */}
        </>
    );
}

export default Manager;
