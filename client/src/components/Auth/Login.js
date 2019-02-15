import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions'
import TextFG from '../common/TextFG';



class Login extends Component {

    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
          
        };
        // this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    
    }


    componentDidMount( ) {
      if(this.props.auth.isAuthenticated){
        this.props.history.push('/dashboard')
      }
    }

    // authentication is true redirect to the dashboard, if cant auth, show errors
    componentWillReceiveProps(nextProps){
      if(nextProps.auth.isAuthenticated){
        this.props.history.push('/dashboard');
      }
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
    const userData = {
        email: this.state.email,
        password: this.state.password,
    };

   this.props.loginUser(userData);
    
    }


  render() {

    const {errors } = this.state

    return (
   
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Log In</h1>
                <p className="lead text-center">Sign in to your b.Social account</p>
                <form onSubmit={this.onSubmit}>
                <TextFG 
                placeholder="Email address"
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.onChange}
                error={errors.email} />

<TextFG 
                placeholder="password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.onChange}
                error={errors.password} />


                  <input type="submit" className="btn btn-info btn-block mt-4" />
                </form>
              </div>
            </div>
          </div>
        </div>
      


    )
  }
}

Login.propTypes = {
  // actions are bje properties 
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {loginUser})(Login);