import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions'
import { getCurrentProfile } from '../../actions/profileActions'





 class Dashboard extends Component {
     // gets called right away 
componentDidMount() {
    this.props.getCurrentProfile();
}
  render() {
    return (
      <div>
        <h1> connectd educatuon connection </h1>
      </div>
    )
  }
}

export default connect(null, { getCurrentProfile})(Dashboard);