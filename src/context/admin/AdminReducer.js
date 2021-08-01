import {
    OPEN_FILTER_MODAL,
    CLOSE_FILTER_MODAL,
    OPEN_EDIT_MEMBER_MODAL,
    CLOSE_EDIT_MEMBER_MODAL,
    OPEN_SOFTWARE_HOUSE_MODAL,
    CLOSE_SOFTWARE_HOUSE_MODAL,
    GET_ORGANIZATION_DATA,
    SET_CURRENT_ORGANIZATION,
    SET_CURRENT_MEMBER,
    GET_MEMBERS,
    FILTER_MEMBER,
    CLEAR_FILTER,
    FILTER_ORGANIZATION
} from '../Type'

export default (state, action)=>{
    switch(action.type){
        // case OPEN_FILTER_MODAL:
        //     return{
        //         ...state,
        //         showFilterMemberModal : true
        //     }
        // case CLOSE_FILTER_MODAL:
        //     return{
        //         ...state,
        //         showFilterMemberModal : false
        //     }
        case OPEN_EDIT_MEMBER_MODAL:
            return{
                ...state,
                showEditMemberModal : true
            }
        case CLOSE_EDIT_MEMBER_MODAL:
            return{
                ...state,
                showEditMemberModal: false,
                currentMember:null
            }
        case OPEN_SOFTWARE_HOUSE_MODAL:
            return{
                ...state,
                showSoftwareHouseModal : true
            }
        case CLOSE_SOFTWARE_HOUSE_MODAL:
            return{
                ...state,
                showSoftwareHouseModal: false,
                currentOrganization:null
            }
        case GET_ORGANIZATION_DATA:
            return {
                ...state,
                organizations: action.payload
            }
        case SET_CURRENT_ORGANIZATION:
            return{
                ...state,
                currentOrganization: action.payload
            }
        case SET_CURRENT_MEMBER:
            return{
                ...state,
                currentMember: action.payload
            }
        case GET_MEMBERS:
            return{
                ...state,
                members: action.payload
            }
        case FILTER_MEMBER:
            return {
                ...state,
                filteredMembers: state.members.filter(member => {
                    const regex = new RegExp(`${action.payload}`, 'gi')
                    return (
                        member.firstName.match(regex) ||
                        member.lastName.match(regex) ||
                        member.email.match(regex) ||
                        member.designation.match(regex) ||
                        member.organization.match(regex)
                    )
                })
            }
        case FILTER_ORGANIZATION:
            return {
                ...state,
                filteredOrganizations: state.organizations.filter(organization => {
                    const regex = new RegExp(`${action.payload}`, 'gi')
                    return (organization.name.match(regex))
                })
            }
        case CLEAR_FILTER:
            return {
                ...state,
                filteredMembers: null,
                filteredOrganizations: null
            }    
        default:
            return{
                state
            }
    }
}