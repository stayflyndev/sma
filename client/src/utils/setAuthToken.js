import axios from 'axios';

const setAuthToken = token => {
    if (token) {
        // apply to all request 

        axios.defaults.headers.common['Authorization'] = token;
    } else {

        delete axios.defaults.headers.common['Authorization']
    }
}

export default setAuthToken;