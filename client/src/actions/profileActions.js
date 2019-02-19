import axios from 'axios';
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS } from './types'

// get current profile
export const getCurrentProfile = () => dispatch => {
// set loading 

dispatch(setProfileLoading());
    axios
    .get('/api/profile')
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


// create profile
export const createProfile = (profileData, history) => dispatch => {
   axios
   .post('api/profile', profileData)
   .then(res => history.push('/dashboard'))
   .catch(err =>
    dispatch({
        type: GET_ERRORS,
        payload:err.response.data
    })
    
    
    );
};




// clear current profile 


export const clearProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}



