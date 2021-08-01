import React, { useContext, useState } from 'react';
import { TextField, ButtonGroup, Button, Typography, } from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import Modal from '../../../../../ui/modal/ModalWindow';
import AdminContext from '../../../../../../context/admin/AdminContext';
import AlertContext from '../../../../../../context/alerts/AlertContext'

function EditMember() {

    const adminContext = useContext(AdminContext);
    const {
        openEditMemberModalHandler,
        closeEditMemberModalHandler,
        currentMember,
        updateMember
    } = adminContext;

    const alertContext = useContext(AlertContext);
    const {
        setMessage
    } = alertContext;


    const [firstName, setFirstName] = useState(currentMember.firstName);
    const handleFirstName = (e) => setFirstName(e.target.value);

    const [lastName, setLastName] = useState(currentMember.lastName);
    const handleLastName = (e) => setLastName(e.target.value);

    const [softwareHouseKey, setSoftwareHouseKey] = useState(currentMember.softwareHouseKey);
    const handleOrganization = (e) => setSoftwareHouseKey(e.target.value);

    const [email, setEmail] = useState(currentMember.email);
    // const handleEmail = (e) => setEmail(e.target.value);

    const [designationKey, setDesignationKey] = useState(currentMember.designationKey);
    const handelDesignation = (e) => setDesignationKey(e.target.value);

    const memberData = {
        key: currentMember.key, 
        firstName,
        lastName,
        email,
        designationKey,
        softwareHouseKey,
        regDate: currentMember.regDate
    };

    const saveData = () => {
        if (!window.navigator.onLine) {
            setMessage('edit member error', 'error')
        }
        updateMember(memberData);
        closeEditMemberModalHandler();
    }


    return (
        openEditMemberModalHandler &&
        <Modal
            clicked={closeEditMemberModalHandler}
            show={true}
        >
            <Typography variant='h6'>
                Member Data
            </Typography>
            <form noValidate autoComplete="off">
                <TextField
                    id="firstName"
                    label="First Name"
                    variant="outlined"
                    fullWidth={true}
                    margin="normal"
                    value={firstName}
                    onChange={handleFirstName}
                />
                <TextField
                    id="lastName"
                    label="Last Name"
                    variant="outlined"
                    fullWidth={true}
                    margin="normal"
                    value={lastName}
                    onChange={handleLastName}
                />
                <TextField
                    id="email"
                    label="Email Address"
                    variant="outlined"
                    fullWidth={true}
                    margin="normal"
                    type='email'
                    value={email}
                    // onChange={handleEmail}
                    disabled
                />
                <TextField
                    id="designationKey"
                    label="Designation Key"
                    variant="outlined"
                    fullWidth={true}
                    margin="normal"
                    value={designationKey}
                    onChange={handelDesignation}
                />
                <TextField
                    id="organisation"
                    label="Organisation"
                    variant="outlined"
                    fullWidth={true}
                    margin="normal"
                    value={softwareHouseKey}
                    // disabled
                    onChange={handleOrganization}
                />
                <ButtonGroup
                    // size='large'
                    margin="normal"
                    variant="contained"
                    fullWidth={true}
                    style={{ marginTop: "20px" }}
                >
                    <Button
                        startIcon={
                            <SaveIcon />
                        }
                        color="primary"
                        onClick={saveData}
                    >
                        Save
                    </Button>
                    <Button
                        startIcon={
                            <CloseIcon />
                        }
                        color="secondary"
                        onClick={closeEditMemberModalHandler}
                    >
                        Cancel
                    </Button>
                </ButtonGroup>
            </form>
        </Modal>
    );
}

export default EditMember;
