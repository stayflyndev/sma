import React, { Component } from 'react'
import axios from 'axios';
import classnames from 'classnames';

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
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

}

onChange(event)
{
    this.setState({[event.target.name]: event.target.value}) //name is the attribute of the input form
}

onSubmit(event){
event.preventDefault();
const newUser = {
    name: this.state.name,
    email: this.state.email,
    password: this.state.password,
    passwordtwo: this.state.passwordtwo
}

// send user created to the db

axios.post('/api/users/register', newUser)
.then(res => console.log(res.data))
.catch(err => console.log(this.setState({errors: err.response.data})))

}



  render() {

    // destructuring 
    const {errors } = this.state 

    return (
     
        <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your b.Social account</p>
              <form onSubmit= {this.onSubmit}>
                <div className="form-group">
                  <input type="text" className={classnames("form-control form-control-lg", {
                      'is-invalid' :errors.name                   })}
                      placeholder="Name" name="name" value={this.state.name} onChange={this.onChange}  />
                      {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                </div>
                <div className="form-group">
                  <input type="email" className={classnames("form-control form-control-lg", {
                      'is-invalid' :errors.email                   })} placeholder="Email Address" name="email" value={this.state.email} onChange={this.onChange} />
                       {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                  <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                </div>
                <div className="form-group">
                  <input type="password" className={classnames("form-control form-control-lg", {
                      'is-invalid' :errors.password                   })} placeholder="Password" name="password" value={this.state.password} onChange={this.onChange}/>
                       {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                </div>
                <div className="form-group">
                  <input type="password" className={classnames("form-control form-control-lg", {
                      'is-invalid' :errors.passwordtwo                   })} placeholder="Confirm Password" name="passwordtwo" value={this.state.passwordtwo} onChange={this.onChange}/>
                       {errors.passwordtwo && (<div className="invalid-feedback">{errors.passwordtwo}</div>)}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    
    )
  }
}

export default Register;