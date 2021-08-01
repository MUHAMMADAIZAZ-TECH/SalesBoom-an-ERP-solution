import React, { useContext } from 'react';
import AdminContext from '../../../../context/admin/AdminContext';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '../../../ui/circularPrgress/CircularProgress';
import Member from './member/Member';


function MemberList() {

    const adminContext = useContext(AdminContext);
    const {
        members,

        filteredMembers
    } = adminContext;

    return (
        <Grid
            style={{
                width: '100%'
            }}
            container
            justify='center'
            spacing='2'
        >
            {
                (filteredMembers || (members.length !== 0)) ?
                    (
                        filteredMembers !== null ? (
                            filteredMembers.map(filteredMember => {
                                return (
                                    <Grid item sm-12 md-4 lg-3 xl-2 key={filteredMember.key}>
                                        <Member data={filteredMember} />
                                    </Grid>
                                );
                            })
                        ) : (
                                members.map(member => {
                                    return (
                                        <Grid item sm-12 md-4 lg-3 xl-2 key={member.key}>
                                            <Member data={member} />
                                        </Grid>
                                    );
                                })
                            )
                    ) : <CircularProgress />
            }
        </Grid>

    );
}

export default MemberList;
