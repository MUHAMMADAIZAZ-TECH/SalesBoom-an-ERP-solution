import React, { useContext } from 'react';
import AdminContext from '../../../../context/admin/AdminContext';
import Grid from '@material-ui/core/Grid';
import Organization from './organization/Organization';
import CircularProgress from '../../../ui/circularPrgress/CircularProgress'

function OrganizationList() {

    const adminContext = useContext(AdminContext);
    const {
        organizations,
        filteredOrganizations,
    } = adminContext;

    // console.log(organizations);

    return (
        <Grid
            style={{
                width: '100%',
            }}
            container
            justify='center'
            spacing='1'
        >
            {

                (filteredOrganizations || (organizations.length!==0)) ? 
                    (
                        filteredOrganizations !== null ?
                        (
                            filteredOrganizations.map(data => {
                                return (
                                    <Grid item key={data.id} sm-12 md-4 lg-3 xl-2>
                                        <Organization data={data} />
                                    </Grid>
                                );
                            })
                        ) : (
                            organizations.map(data => {
                                return (
                                    <Grid item key={data.id} sm-12 md-4 lg-3 xl-2>
                                        <Organization data={data} />
                                    </Grid>
                                );
                            })
                        )
                    ) : <CircularProgress />
            }
        </Grid >

    );
}

export default OrganizationList;
