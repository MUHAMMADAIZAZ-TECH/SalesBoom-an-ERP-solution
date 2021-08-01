import React, {useContext} from 'react'
import Admin from '../../admin/Admin'
//import Manager from '../../manager/Manager'
import Manager from '../../manager/managerDashboard/ManagerDashboard'
import AuthContext from '../../../context/auth/AuthContext'
import UserDashboard from '../../user/UserDashboard';
function Dashboard(props) {

    const authContext = useContext(AuthContext);

    const {
        user,
        isLoggedIn
    } = authContext;
    return (
        <>
            {
                isLoggedIn ? (
                    user.designation === 'admin' ? 
                        (<Admin />) : user.designation === 'Manager' ?
                            (<Manager />) : user.designation === 'SalesCounter' ?
                                (<UserDashboard />) : null
                ) : props.history.push('/')     
            }
        </>       
    )
}

export default Dashboard