import {
    ALERT,
    REMOVE_ALERT,
    SET_LOADING
} from '../Type'

export default (state, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case ALERT:
            return {
                ...state,
                alertMessage: action.payload.alert,
                type: action.payload.type
            }
            case REMOVE_ALERT:
                return {
                    ...state,
                    alertMessage: null,
                    type: null
            }
        default:
            return state
    }
}