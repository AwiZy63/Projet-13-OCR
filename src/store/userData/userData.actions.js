import { DEFINE_USERDATA_ACTION, EDIT_PROFILE_USERDATA_ACTION, REMOVE_USERDATA_ACTION } from "./userData.reducer";



export const defineUserDataAction = (credentials) => ({
    type: DEFINE_USERDATA_ACTION,
    payload: credentials
});

export const editUserProfileAction = (data) => ({
    type: EDIT_PROFILE_USERDATA_ACTION,
    payload: data
});

export const removeUserDataAction = () => ({
    type: REMOVE_USERDATA_ACTION
});