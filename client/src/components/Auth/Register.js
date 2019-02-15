import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter }from 'react-router-dom'; // to route from within the redux action
import TextFG from '../common/TextFG'

import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions'

class Register extends Component {
constructor(){
    super();
    this.state = {
        name: '',
        email: '',
        password: '',
        passwordtwo:'' ,
        errors: {}
      
    };
    // this.onChange = this.onChange.bind(this)
    // this.onSubmit = this.onSubmit.bind(this)

}
componentDidMount( ) {
  if(this.props.auth.isAuthenticated){
    this.props.history.push('/dashboard')
  }
}

// runs when the component recieves new properties

componentWillReceiveProps(nextProps){
  if(nextProps.errors){
    this.setState({errors: nextProps.errors})
  }
}

onChange = (event) =>
{
    this.setState({[event.target.name]: event.target.value}) //name is the attribute of the input form
}

onSubmit = (event) => {
event.preventDefault();
const newUser = {
    name: this.state.name,
    email: this.state.email,
    password: this.state.password,
    passwordtwo: this.state.passwordtwo
};

this.props.registerUser(newUser, this.props.history) //redirect within the action

// send user created to the db

}




  render() {

    // destructuring 
    const {errors } = this.state;

 

    return (
  
        <div className="register">
         <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your b.Social account</p>
              <form onSubmit= {this.onSubmit}>
              <TextFG 
                placeholder="name"
                name="name"
                type=""
                value={this.state.name}
                onChange={this.onChange}
                error={errors.name} />
                
                <TextFG 
                placeholder="email"
                name="email"
                type=""
                value={this.state.email}
                onChange={this.onChange}
                error={errors.email} 
                info="this uses gravatar" />
              
              
              <TextFG 
                placeholder="password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.onChange}
                error={errors.password}
                 />
                
                <TextFG 
                placeholder="confirm passwored"
                name="passwordtwo"
                type="password"
                value={this.state.passwordtwo}
                onChange={this.onChange}
                error={errors.passwordtwo} />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    
    )
  }
}

Register.propTypes ={
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}


// get the auth state into the component 
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, {registerUser})(withRouter(Register));