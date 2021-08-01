import React, {useContext, useState} from 'react'
import Modal from '../../../../ui/modal/ModalWindow'
import {Typography, TextField, Button, ButtonGroup, FormControl, MenuItem, Select} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import AdminContext from '../../../../../context/admin/AdminContext'


function FilterMember() {
    const adminContext = useContext(AdminContext);
    const { showFilterMemberModal, closeFilterModalHandler } = adminContext;
    
    const [firstName, setFirstName] = useState('');
    const handleFirstName = (e) => setFirstName(e.target.value);

    const [lastName, setLastName] = useState('');
    const handleLastName = (e) => setLastName(e.target.value);
    
    const [organization, setOrganization] = useState('');
    const handleOrganization = (e) => setOrganization(e.target.value);
    
    const [email, setEmail] = useState('');
    const handleEmail = (e) => setEmail(e.target.value);
    
    const [designation, setDesignation] = useState('');
    const selectDesignation = (e) => setDesignation(e.target.value);
    
    const designationsArray = [
        {
            id: '1',
            desig: 'Project Manager'
        },
        {
            id: '2',
            desig: 'Developer'
        },
        {
            id: '3',
            desig: 'Tester'
        }
    ];
    
    return (
        showFilterMemberModal &&
        <Modal
            show={true}  // yahan true pass krny ke zarurat he kiya hy jb hard code he dy rhy hyn to?
            clicked={closeFilterModalHandler}
        >
            <Typography variant='h6'>
                Search By
            </Typography>
            <form noValidate>
                <TextField 
                    id="orgName" 
                    label="Organization" 
                    variant="outlined" 
                    fullWidth={true}
                    margin='normal'
                    value={organization}
                    onChange={handleOrganization}
                    />
                <TextField 
                    id="firtName" 
                    label="First Name" 
                    variant="outlined" 
                    fullWidth={true}
                    margin='normal'
                    value={firstName}
                    onChange={handleFirstName}
                    />
                <TextField 
                    id="lastName" 
                    label="Last Name" 
                    variant="outlined" 
                    margin='normal'
                    fullWidth={true}
                    value={lastName}
                    onChange={handleLastName}
                />
                <TextField 
                    id="email" 
                    label="Email Address" 
                    variant="outlined" 
                    margin='normal'
                    fullWidth={true}
                    type='email'
                    autoComplete='off'
                    value={email}
                    onChange={handleEmail}
                />
                
                <FormControl
                    margin='normal'
                    fullWidth={true}
                    variant='outlined'>
                    <Select
                        value={designation}
                        onChange={selectDesignation}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value="" disabled>
                            Select Designation
                        </MenuItem>
                        {designationsArray.map((value) => {
                            return (
                                <MenuItem
                                    value={value.id}
                                    key={value.id}
                                    >{value.desig}
                                </MenuItem>
                             );
                        })}
                    </Select>

                    <ButtonGroup 
                        // size='large'
                        margin='normal'
                        variant='contained'
                        fullWidth={true}
                        style={{marginTop: '20px'}}
                    >
                        <Button
                            startIcon={<SearchIcon />}
                            color='primary'
                        >
                            Search
                        </Button>
                        <Button 
                            startIcon={<CloseIcon />} 
                            color='secondary'
                            onClick={closeFilterModalHandler}
                        >
                            Cancel
                        </Button>
                    </ButtonGroup>
                </FormControl>
            </form>
        </Modal>
    )
}

export default FilterMember
