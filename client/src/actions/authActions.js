import axios from 'axios';

import { GET_ERRORS } from './types'

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