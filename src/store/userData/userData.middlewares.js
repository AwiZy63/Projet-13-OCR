import axios from 'axios';
import { DEFINE_USERDATA_ACTION, EDIT_PROFILE_USERDATA_ACTION } from "./userData.reducer"
// import jwt_decode from 'jwt-decode';

const apiUrl = 'http://localhost:3001/api/v1';
const endpoints = {
    user: {
        register: '/user/signup',
        profile: '/user/profile',
        login: '/user/login'
    }
}

export const userMiddlewares = (store) => (next) => async (action) => {
    if (action.type === DEFINE_USERDATA_ACTION) {
        const response = await signInUser(action.payload);
        
        if (response?.error) {
            return response;
        };

        const userData = await fetchUserProfile(response.token);

        if (userData?.error) {
            return userData;
        }

        const { id, firstName, lastName, email, createdAt, updatedAt } = userData.data;

        action.payload = {
            id: id,
            firstName: firstName,
            lastName: lastName,
            email: email,
            accessToken: response.token,
            createdAt: createdAt,
            updatedAt: updatedAt,
        }

        return next(action);
    }

    if (action.type === EDIT_PROFILE_USERDATA_ACTION) {
        const { identity, token } = action.payload;

        const response = await editUserProfile(identity, token);

        if (response?.error) {
            return response;
        }

        action.payload = identity;
        return next(action);
    }

    return next(action);
}

const signInUser = (data) => axios(`${apiUrl}${endpoints.user.login}`, {
    method: 'POST',
    data: data,
}).then((res) => {
    return { error: false, token: res.data.body.token };
}).catch(async (err) => {
    if (err?.response?.data?.message) {
        return { error: true, message: err.response.data.message };
    }
});

const fetchUserProfile = (token) => axios(`${apiUrl}${endpoints.user.profile}`, {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then((res) => {
    return { error: false, data: res.data.body }
}).catch((err) => {
    if (err?.response?.data?.message) {
        return { error: true, message: err.response.data.message };
    }
})

const editUserProfile = (data, token) => axios(`${apiUrl}${endpoints.user.profile}`, {
    method: 'PUT',
    headers: {
        'Authorization': `Bearer ${token}`
    },
    data: data
}).then((res) => {
    return { error: false, data: res.data.body }
}).catch((err) => {
    if (err?.response?.data?.message) {
        return { error: true, message: err.response.data.message };
    }
}) 