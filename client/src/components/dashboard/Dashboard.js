import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions'
import { getCurrentProfile } from '../../actions/profileActions'
import Spinner from '../common/Spinner'
import {Link} from 'react-router-dom';





class Dashboard extends Component {
  // gets called right away 
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {

    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;
    if (profile === null || loading) {
      dashboardContent = <Spinner/>
    } else {
      // check logged in user has profile data

      if(Object.keys(profile).length > 0 ){
        dashboardContent = <h4>display profile</h4>
      } else {
        // logged in but has no profile
        dashboardContent = (
          <div> 
          <p className="lead text-muted"> Welcome {user.name} </p>
          <p className="lead text-muted">You do not have a profile created </p>
          <Link to='/create-profile' className="btn btn-lg btn-info btn-primary"> Create profile</Link>
          </div>
        )
      }
    }


    return (
      <div className="dashboard">
        <div className="container">

          <div className="row">
            <div className="col-md-12">

            <h1 className="display-4"> dashboard</h1>
            {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  // actions are bje properties 
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);