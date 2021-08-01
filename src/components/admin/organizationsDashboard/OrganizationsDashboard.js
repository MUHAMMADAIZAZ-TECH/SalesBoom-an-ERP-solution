import React, { useState, useContext } from 'react';
import { Container, Typography, TextField } from '@material-ui/core';
import OrganizationList from './organizations/OrganizationList';
import AdminContext from '../../../context/admin/AdminContext';
import OrganizationData from './organizations/organization/organizationData/OrganizationData';


function OrganizationsDashboard() {

    const adminContext = useContext(AdminContext);
    const {
        showSoftwareHouseModal,
        filterOrganizations,
        clearFilter
    } = adminContext;

    const [filterOrganization, setFilterOrganization ] = useState('')
    const handleFilterOrganization = (e) => {
        setFilterOrganization(e.target.value);
        if (!filterOrganization) {
            clearFilter();
        } else {
            filterOrganizations(e.target.value);
        }
    }

    return (
        <Container
            maxWidth="lg"
            style={{
                marginTop: '10px',
                height: '80vh'
            }}
        >
            <div
                style={{
                    // border: '1px solid',
                    display: 'flex',
                    alignItems: 'center',
                    // marginBottom: '40px'
                }}
            >
                <Typography variant='h5'
                    style={{
                        flexGrow: '1'
                    }}
                >
                    Organizations
                </Typography>
                {/* <form noValidate autoComplete="off">
                    <TextField id="search" label="Search by Name" variant="outlined" size='small'/>
                </form> */}
            </div>
            <TextField
                id="filter"
                label="Filter Organization"
                variant="outlined"
                fullWidth={true}
                margin='normal'
                value={filterOrganization}
                onChange={handleFilterOrganization}
                autoComplete='off'
            />
            <div
                style={{
                    // border: '1px solid',
                    height: '65vh',
                    overflow: 'auto',
                    paddingTop: '10px'
                }}
            >
                <OrganizationList />
            </div>
            {showSoftwareHouseModal &&
                <OrganizationData />
            }
        </Container>
    );
}

export default OrganizationsDashboard;
