const initialState = {
    isLogged: false
}

export const DEFINE_USERDATA_ACTION = 'userData/define';
export const REMOVE_USERDATA_ACTION = 'userData/remove';
export const EDIT_PROFILE_USERDATA_ACTION = 'userData/profile/edit';

const userDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case DEFINE_USERDATA_ACTION:
            state = Object.assign({}, state, { isLogged: true }, action.payload);
            return state;
        case EDIT_PROFILE_USERDATA_ACTION:
            const { firstName, lastName } = action.payload;            

            state = Object.assign({}, state, {
                firstName: firstName,
                lastName: lastName
            });
            return state;
        case REMOVE_USERDATA_ACTION:
            state = initialState;
            return state;
        default:
            break;
    }
    return state
}

export default userDataReducer;