import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions'

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Dashboard from './components/dashboard/Dashboard';


import Register from './components/Auth/Register';
import Login from './components/Auth/Login';


import './App.css';
import { clearProfile } from './actions/profileActions';



// check token against pages
if(localStorage.jwtToken){
  // set the auth header
  setAuthToken(localStorage.jwtToken);
  // decode the token
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and is authenticated
  store.dispatch(setCurrentUser(decoded));

  // check for expired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());

    store.dispatch(clearProfile());

// clear profile and redirect to login

    window.location.href= '/login';
  }
}


class App extends Component {
  render() {
    return (
     
<Provider store ={store}>
      <Router>
      <div className="App">
      <Navbar /> 
      <Route exact path ='/' component={Landing} />
      <div className="container">
      <Route exact path= "/register" component={Register} />
      <Route exact path= "/login" component={Login} />
      <Route exact path= "/dashboard" component={Dashboard} />

      </div>
     <Footer /> 
      </div>
   </Router>

 </Provider>

    );
  }
}

export default App;
