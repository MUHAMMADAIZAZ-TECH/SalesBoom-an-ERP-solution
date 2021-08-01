import React, { useState, useContext } from 'react'
import AdminContext from '../../../../../../context/admin/AdminContext';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper, Container, Grid } from '@material-ui/core'
import Modal from '../../../../../ui/modal/ModalWindow';



function OrganizationData() {
    
    const adminContext = useContext(AdminContext);
    const {
        showSoftwareHouseModal,
        closeSoftwareHouseModalHandler,
        currentOrganization
    } = adminContext;

    const designation = currentOrganization.organizationKeys;
    let designationArray = [];
    Object.keys(designation)
        .forEach((key) => {
            designationArray.push(designation[key]);
        });

        const useStyles = makeStyles({
            paper:{
                margin: 10,
                padding: 10,
                backgroundColor: '#f5f5f54d',
                display: 'flex'
                // width: '400px'
            }
        });
         const classes=  useStyles();

    return (
        showSoftwareHouseModal &&
        <Modal
            show={true}  // yahan true pass krny ke zarurat he kiya hy jb hard code he dy rhy hyn to?
            clicked={closeSoftwareHouseModalHandler}
        >

            <Typography variant='h5'>
                Organization Data
            </Typography>
            <Grid spacing={3}>
                    <Paper elavation={2} className={classes.paper}>
                        <Grid item xs-3 sm-3 md-3 lg-3 xl-3>
                            <Typography variant='body1'>
                                Reg.No: 
                            </Typography>            
                        </Grid>
                        <Grid item xs-9 sm-9 md-9 lg-9 xl-9>
                            <Typography variant='body1'>
                                {currentOrganization.id}
                            </Typography>            
                        </Grid>
                    </Paper>
                    
                    <Paper elavation={2} className={classes.paper}>
                        <Grid item xs-3 sm-3 md-3 lg-3 xl-3>
                            <Typography variant='body1'>
                                Name: 
                            </Typography>            
                        </Grid>
                        <Grid item xs-9 sm-9 md-9 lg-9 xl-9>
                            <Typography variant='body1'>
                                {currentOrganization.name}
                            </Typography>            
                        </Grid>
                    </Paper>

                    <Paper elavation={2} className={classes.paper}>
                        <Grid item xs-3 sm-3 md-3 lg-3 xl-3>
                            <Typography variant='body1'>
                                Email:
                            </Typography>            
                        </Grid>
                        <Grid item xs-9 sm-9 md-9 lg-9 xl-9>
                            <Typography variant='body1'>
                                {currentOrganization.email}
                            </Typography>            
                        </Grid>
                    </Paper>

                    <Paper elavation={2} className={classes.paper}>
                        <Grid item xs-3 sm-3 md-3 lg-3 xl-3>
                            <Typography variant='body1'>
                                Address:
                            </Typography>            
                        </Grid>
                        <Grid item xs-9 sm-9 md-9 lg-9 xl-9>
                            <Typography variant='body1'>
                                {currentOrganization.address}
                            </Typography>            
                        </Grid>
                    </Paper>

                    <Paper elavation={2} className={classes.paper}>
                        <Grid item xs-3 sm-3 md-3 lg-3 xl-3>
                            <Typography variant='body1'>
                                Contact:
                            </Typography>            
                        </Grid>
                        <Grid item xs-9 sm-9 md-9 lg-9 xl-9>
                            <Typography variant='body1'>
                                {currentOrganization.contact}
                            </Typography>            
                        </Grid>
                    </Paper>
                </Grid>
            <Typography variant='h5'>
                Keys
            </Typography>

                {
                    designationArray.map((data) => {
                        return (
                            <Paper elavation={2} className={classes.paper}>
                            <Grid item xs-3 sm-3 md-3 lg-3 xl-3>
                                <Typography variant='body1'>
                                    {data.designation.charAt(0).toUpperCase() + data.designation.slice(1)}:
                                </Typography>
                            </Grid>
                            <Grid item xs-9 sm-9 md-9 lg-9 xl-9>
                                <Typography variant='body1'>
                                    {data.key}
                                </Typography>
                            </Grid>
                            </Paper>
                        )
                    })
                }
        </Modal>
    )
}

export default OrganizationData
