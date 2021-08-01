import React, {useContext} from 'react'
import {Route, Redirect} from 'react-router-dom'
import AuthContext from '../context/auth/AuthContext' 

function PrivateRoute({component: Component, ...rest }) {
    
    const authContext = useContext(AuthContext);
    const {
        isLoggedIn
    } = authContext;
    // console.log(isLoggedIn)
    // console.log(rest)
    
    return (
        <Route
            {...rest}

            render = {(props)=>{
                return (
                    !isLoggedIn ?
                        <Redirect to='/' /> :
                        <Component {...props} />
                )
            }}
        />
    )
}

export default PrivateRoute
