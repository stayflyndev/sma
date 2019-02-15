import axios from 'axios';
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

import { GET_ERRORS, SET_CURRENT_USER } from './types'

export const registerUser = (userData, history) => dispatch => {
    // wait for response then distpatch (async data)
    axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login')) //redirect to a page after siging in successfully 
    .catch(err =>
        dispatch ({
            type: GET_ERRORS, // the type 
            payload: err.response.data
        })
        );
};



// login user 

export const loginUser = userData => dispatch => {
    axios
    .post('/api/users/login', userData)
    .then(res => {
        const {token} = res.data;

        //set token to  ls
        localStorage.setItem('jwtToken', token);

        //set token to authheader
        setAuthToken(token);

        // decode token
        const decoded = jwt_decode(token);

        // set current user
        dispatch(setCurrentUser(decoded));

    }) //redirect to a page after siging in successfully 
    .catch(err =>
        dispatch ({
            type: GET_ERRORS, // the type 
            payload: err.response.data
        })
        );
};


//set logged in user 

export const setCurrentUser = decoded => {
    return { //dispatch to reducer
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// logout user
export const logoutUser = () => dispatch => {
    // remove the token first 

    localStorage.removeItem('jwtToken');

    // remove the header

    setAuthToken(false);

    // set the current user to an empty object which sets isauthenticated to false

    dispatch(setCurrentUser({}));
};

