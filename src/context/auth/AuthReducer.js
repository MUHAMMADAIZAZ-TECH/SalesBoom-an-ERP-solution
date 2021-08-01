import {
    SET_USER_DATA,
    USER_LOG_OUT,
    SHOW_PROFILE_FLAG,
    CLOSE_PROFILE_FLAG,
    SET_LOGIN_STATUS
} from '../Type';

export default (state, action) => {
    switch (action.type) {
        case SET_LOGIN_STATUS:
            return {
                ...state,
                isLoggedIn: true
            }
        case SET_USER_DATA:
            return {
                ...state,
                user: action.payload,
                // isLoggedIn: true
            };

        case USER_LOG_OUT:
            return{
                ...state,
                user: {},
                isLoggedIn: false
            }
        
        case SHOW_PROFILE_FLAG:
            return {
                ...state,
                profileFlag: true
            }
        case CLOSE_PROFILE_FLAG:
            return {
                ...state,
                profileFlag: false
            }
        default:
            return state
    }
}