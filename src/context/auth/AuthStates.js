import React, { useContext, useReducer} from 'react';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import Database from '../../config/Database';
import AlertContext from '../alerts/AlertContext';
import {
    useHistory
} from 'react-router-dom'

import {
    SET_USER_DATA,
    USER_LOG_OUT,
    SHOW_PROFILE_FLAG,
    CLOSE_PROFILE_FLAG,
    SET_LOGIN_STATUS,
    SET_LOADING
} from '../Type';

const AuthStates = props => {

    const initialState = {
        user: {},
        isLoggedIn: false,
        profileFlag: false
    };

    const alertContext = useContext(AlertContext)
    const {
        setMessage,
        toggleLoading
    } = alertContext;

    const history = useHistory();

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const currentDate = () => {

        let now = new Date();
    
        let getMonth = () => {
          let month = now.getMonth() + 1;
          if (month < 10) {
            return "0" + month.toString();
          } else return month.toString();
        };
    
        let getDate = () => {
          let current = (now.getDate());
          if (current < 10) {
            return "0" + current.toString();
            // return current.toString();
          } else return current.toString();
        };
    
        let getYear = () => {
          let year = (now.getFullYear()).toString();
          if (year < 10) {
            return "0" + year.toString();
          } else return year.toString();
        };
    
        return getYear() + "-" + getMonth() + "-" + getDate();
      };
    
    const getUserData = () => {
        let userData;
        Database.auth().onAuthStateChanged(function (user) {
            if (user) {
                // console.log(user)
                // key=user.uid
                if (user.emailVerified) {
                    toggleLoading(true)
                    dispatch({type:SET_LOGIN_STATUS})
                    Database.database().ref(`/registered-users/${user.uid}`).once('value')
                        .then(
                            (data) => {
                                userData = { ...data.val() };
                                dispatch({ type: SET_USER_DATA, payload: userData });
                                // console.log(userData);
                                toggleLoading(false)
                            }
                        )
                        .catch(
                            (error) => {
                                console.log('catch block')
                                console.log(error);
                                toggleLoading(false)

                            }
                        );
                }
            }
        });
    };

    const userLogin = async (formData) => {
        toggleLoading(true)
        await Database.auth().signInWithEmailAndPassword(formData.email, formData.password)
            .then(res => {
                if (res.user.emailVerified) {
                    getUserData();    
                } else {
                    setMessage('email not verified', 'error')
                    setTimeout(() => {
                        userLogOut()
                        toggleLoading(false)
                    }, 3000);
                }
            })
            .catch(err => {
                setMessage(err.code, 'error')
                toggleLoading(false)
            });
    };

    const userLogOut = async () => {
        Database.auth().signOut().then(() => {
            // alert('logged out');
            dispatch({ type: USER_LOG_OUT });
        }).catch(function (error) {
            setMessage(error.code, 'error')
        });
    };

    const registerUser = async (user) => {
        // console.log(user);
        const {
            email,
            password
        } = user;
                    Database.auth().createUserWithEmailAndPassword(email, password)
                        .then((res) => {
                            res.user.sendEmailVerification()
                                .then(function () {
                                    let userID = res.user.uid
                                    setUserData(user, userID);
                                    setMessage('signed up', 'success')
                                    userLogOut();
                                    history.push('/');
                                    // getUserData();

                                })
                                .catch(function (error) {
                                    console.log(error)
                                });
                                // key = res.user.uid;
                    })
                    .catch((err) => {
                        setMessage(err.code, 'error')
                    })
                // }
        // })
    }

    const setUserData = (data, id) => {
        // console.log(data, id)
        let orgData, designation, userData, organization;
        const {
            firstName,
            lastName,
            email,
            softwareHouseKey,
            designationKey,
            regDate
        } = data

        //use to get SH data ny SH key
        Database.database().ref(`/organizations/${softwareHouseKey}`).once('value')
        .then(data => {
            orgData = {...data.val()}
            designation = orgData.organizationKeys[designationKey].designation
            organization = orgData.name
            userData = {
                key: id,
                firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase(),
                lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase(),
                email: email,
                softwareHouseKey:softwareHouseKey,
                designationKey:designationKey,
                designation: designation.charAt(0).toUpperCase() + designation.slice(1),
                organization: organization.charAt(0).toUpperCase() + organization.slice(1),
                regDate: regDate
            }
            
            Database.database().ref(`/registered-users/${userData.key}`).set(userData)
                .then(res =>{
                    // console.log(window.location.pathname)
                    if (window.location.pathname === '/dashboard/view-members') {
                        setMessage('User updated','success')
                    }
                    // res=>console.log(res)
                })
                .catch(err=>setMessage(err.code, 'error'))

        })
    }
     const objectToArray = (obj) => {
         let convertedArray = [];
         if (obj !== null) {
             Object.keys(obj).forEach(item => {
                 convertedArray.push(obj[item]);
             });
         }
         return convertedArray;
    };
    
    const showProfile = () => {
        dispatch({
            type: SHOW_PROFILE_FLAG
        })
    }

    const closeProfile = () => {
        dispatch({
            type: CLOSE_PROFILE_FLAG
        })
    }

    const forgetPassword = (email) => {
        Database.database().ref(`/registered-users`).orderByChild('email').equalTo(email).on('value', function (res) {
            if (res.val()) {
                Database.auth().sendPasswordResetEmail(email)
                    .then(function (res) {
                        setMessage('password reset mail sent', 'success')
                        // setTimeout(() => {
                        //     props.history.replace('/')
                        // }, 3000)
                    })
                    .catch(function () {
                        setMessage('some error', 'error')
                    });
                    setTimeout(() => {
                        history.push('/')
                    }, 3000);
                
            } else {
                setMessage('auth/user-not-found', 'error')
            }
        })
    }


    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isLoggedIn: state.isLoggedIn,
                profileFlag: state.profileFlag,
                currentDate,
                userLogin,
                getUserData,
                userLogOut,
                registerUser,
                setUserData,
                objectToArray,
                showProfile,
                closeProfile,
                forgetPassword
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthStates;
