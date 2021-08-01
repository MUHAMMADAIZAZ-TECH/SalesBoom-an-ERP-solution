import React, {useReducer, useContext} from 'react';
import AdminReducer from './AdminReducer'
import AdminContext from './AdminContext'
import AuthContext from '../auth/AuthContext'
import AlertContext from '../alerts/AlertContext'
import {
    OPEN_FILTER_MODAL,
    CLOSE_FILTER_MODAL,
    OPEN_EDIT_MEMBER_MODAL,
    CLOSE_EDIT_MEMBER_MODAL,
    OPEN_SOFTWARE_HOUSE_MODAL,
    CLOSE_SOFTWARE_HOUSE_MODAL,
    GET_ORGANIZATION_DATA,
    SET_CURRENT_ORGANIZATION,
    GET_MEMBERS,
    SET_CURRENT_MEMBER,
    FILTER_MEMBER,
    CLEAR_FILTER,
    FILTER_ORGANIZATION
} from '../Type'
import Database from '../../config/Database'

const AdminStates = props => {
    
    const initialState = {
        // showFilterMemberModal: false,
        showEditMemberModal: false,
        showSoftwareHouseModal: false,
        currentMember:null,
        currentOrganization:null,
        organizations: [],
        filteredOrganizations:null,
        members: [],
        filteredMembers: null
    }
    
    const authContext = useContext(AuthContext);
    const {
        setUserData
    } = authContext
    
    const alertContext = useContext(AlertContext)
    const {
        setMessage
    } = alertContext;

    const [state, dispatch] = useReducer(AdminReducer, initialState);
    
    // const openFilterModalHandler =  () => {
    //     dispatch({type: OPEN_FILTER_MODAL});
    // }

    // const closeFilterModalHandler =  () => {
    //     dispatch({type: CLOSE_FILTER_MODAL});
    // }

    const openEditMemberModalHandler = () => {
        dispatch({type: OPEN_EDIT_MEMBER_MODAL});
    }

    const closeEditMemberModalHandler =  () => {
        dispatch({type: CLOSE_EDIT_MEMBER_MODAL});
    }

    const openSoftwareHouseModalHandler = () => {
        dispatch({ type: OPEN_SOFTWARE_HOUSE_MODAL});
    }

    const closeSoftwareHouseModalHandler =  () => {
        dispatch({ type: CLOSE_SOFTWARE_HOUSE_MODAL});
    }

    const registerOrganization = (data) => {
        Database.database().ref(`/organizations/${data.id}`).set(data)
            .then((res) => {
                setMessage('organization added', 'success')
            })
            .catch(err=>{
                setMessage(err.code, 'error')
            })
    }

    const getOrganizations = () => {
        let organizationData, organizations = [];
        Database.database().ref(`/organizations`).once('value')
            .then(
                (data) => {
                    organizationData = { ...data.val() };
                    Object.keys(organizationData)
                        .forEach((key) => {
                            organizations.push(organizationData[key]);
                        });
                    
                    // console.log(organizations);
                    dispatch({ type: GET_ORGANIZATION_DATA, payload: organizations });
                }
            )
            .catch(
                (error) => {
                    setMessage(error.code, 'error')
                }
            );
    }

    const setCurrentOrganization = (organization) => {
        dispatch({type: SET_CURRENT_ORGANIZATION, payload:organization});
    }
    
    const setCurrentMember = (member) => {
        dispatch({type: SET_CURRENT_MEMBER, payload:member});
    }

    const getMembers = () =>{
        let registeredUsers, users=[];
        Database.database().ref('/registered-users').once('value')
        .then(res=>{
            registeredUsers={...res.val()}
            // console.log(registeredUsers)
            Object.keys(registeredUsers).forEach(key=>{
                if((registeredUsers[key].designation) !== 'admin'){
                    users.push(registeredUsers[key])
                }
            })

            dispatch({type:GET_MEMBERS, payload:users});

        })
        .catch(err => {
            setMessage(err.code,'error')
        })
    }

    const updateMember = (data) => {
        setUserData(data, data.key);
    }

    const filterMembers = (text) => {
        dispatch({type:FILTER_MEMBER, payload:text})
    }
    
    const clearFilter = (text) => {
        dispatch({type:CLEAR_FILTER})
    }

    const filterOrganizations = (text) => {
        dispatch({ type: FILTER_ORGANIZATION, payload: text })
        // console.log(text);
    }

    return (
        <AdminContext.Provider
            value={{
                // showFilterMemberModal: state.showFilterMemberModal,
                showEditMemberModal: state.showEditMemberModal,
                showSoftwareHouseModal: state.showSoftwareHouseModal,
                organizations: state.organizations,
                currentOrganization: state.currentOrganization,
                members: state.members,
                filteredMembers: state.filteredMembers,
                filteredOrganizations: state.filteredOrganizations,
                currentMember: state.currentMember,
                // openFilterModalHandler,
                // closeFilterModalHandler,
                openEditMemberModalHandler,
                closeEditMemberModalHandler,
                openSoftwareHouseModalHandler,
                closeSoftwareHouseModalHandler,
                registerOrganization,
                getOrganizations,
                setCurrentOrganization,
                getMembers,
                updateMember, 
                setCurrentMember,
                filterMembers,
                filterOrganizations,
                clearFilter
            }}
        >
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminStates
