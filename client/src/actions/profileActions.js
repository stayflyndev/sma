import axios from 'axios';
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE } from './types'

// get current profile
export const getCurrentProfile = () => dispatch => {
// set loading 

dispatch(setProfileLoading());


    axios
    .get('/api/users/profile')
    .then(res => //redirect to a page after siging in successfully 
           dispatch ({
            type: GET_PROFILE, // the type 
            payload: res.data
        })
        )
        .catch (err => 
                    dispatch ({
                    type: GET_PROFILE, // the type 
                    payload: {}
            })
            )
        };


export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}


// clear current profile 


export const clearProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}



