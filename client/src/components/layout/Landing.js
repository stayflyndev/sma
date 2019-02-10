import React, { Component } from 'react'

export default class Landing extends Component {
  render() {
    return (
     

        <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4 header">b.Social
                </h1>
                <p className="lead subheader"> Where Black Brilliance Meets</p>
                <hr />
                <a href="register.html" className="btn btn-lg btn-info mr-2 links">Sign Up</a>
                <a href="login.html" className="btn btn-lg btn-light links">Login</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
