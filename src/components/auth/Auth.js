import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignIn from './signIn/SignIn';
import SignUp from './signUp/SignUp';
import ForgetPassword from './forgetPassword/ForgetPassword'

function Auth() {
    return (
            <Switch>
                <Route path='/' exact component={SignIn} />
                <Route path='/sign-up' component={SignUp} />
                <Route path='/forgot-password' component={ForgetPassword} />
            </Switch>
    );
}

export default Auth;
