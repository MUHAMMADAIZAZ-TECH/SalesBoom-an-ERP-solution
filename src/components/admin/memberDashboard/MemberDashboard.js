import React, { useContext, useEffect, useState } from 'react';
import { Container, Typography, TextField } from '@material-ui/core';
import MemberList from './members/MemberList';
import FilterButton from '../../ui/button/filterButton/FilterButton';
import AdminContext from '../../../context/admin/AdminContext';
import FilterMember from './members/filterMember/FilterMember';
import EditMember from './members/member/editMember/EditMember';

function ViewMember() {

    const adminContext = useContext(AdminContext);
    const {
        // showFilterMemberModal,
        showEditMemberModal,
        // openFilterModalHandler,
        getMembers,
        filterMembers,
        clearFilter
    } = adminContext;

    useEffect(() => {
        getMembers();
    }, []);

    const [filterMember, setFilterMember] = useState(null);
    
    const handleFilterMember = (e) => {
        setFilterMember(e.target.value);
        console.log(e.target.value)
        if (!filterMember) {
            clearFilter('filterMember');
        } else {
            filterMembers(e.target.value);
        }
    }

    // if (filterMember) {
    //     filterMembers(filterMember);
    // } else {
    //     clearFilter();
    // }

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
                    View Members
                    </Typography>
                {/* <FilterButton clicked={openFilterModalHandler} /> */}
            </div>
            <TextField
                id="filter"
                label="Filter Member"
                variant="outlined"
                fullWidth={true}
                margin='normal'
                value={filterMember}
                onChange={handleFilterMember}
                autoComplete='off'
            />
            <div
                style={{
                    // border: '1px solid',
                    height: '66vh',
                    overflow: 'auto',
                    paddingTop: '10px'
                }}
            >
                <MemberList />
            </div>
            {/* {showFilterMemberModal &&
                <FilterMember />
            } */}
            {showEditMemberModal &&
                <EditMember />
            }
        </Container>
    );
}

export default ViewMember;
