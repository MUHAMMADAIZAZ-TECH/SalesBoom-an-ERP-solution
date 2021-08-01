import React from 'react';
import { Route, Switch, useRouteMatch} from 'react-router-dom';
import AdminDashboard from './adminDashboard/AdminDashboard';
import AddOrganization from './addOrganization/AddOrganization';
import MemberDashboard from './memberDashboard/MemberDashboard';
import OrganizationsDashboard from './organizationsDashboard/OrganizationsDashboard';


function Admin() {

    const route = useRouteMatch();
    const path = route.path;

    return (
        <AdminDashboard>
            <Switch>
                <Route path={`${path}`} exact component={AddOrganization} />
                <Route path={`${path}/view-organizations`} exact component={OrganizationsDashboard} />
                <Route path={`${path}/view-members`} exact component={MemberDashboard} />
            </Switch>
        </AdminDashboard>
    );
}

export default Admin;
