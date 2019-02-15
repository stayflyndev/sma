import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFG from '../common/TextFG';





 class CreateProfile extends Component {
  constructor(props){
      super(props);
      this.state = {
          handle: '',
          company: '',
          website: '',
          location: '',
          status: '',
          skills: '',
          bio: '',
          errors: ''
      }
  }
  render() {

    

    return (
      <div className="createprofile">
            <div className="container">
            <div className="row">
            <div className="col-md-8 m-auto">
            <h1> CREATE YOUR profile </h1>

                </div></div></div>
   
      
      </div>
    )
  }
}

CreateProfile.propTypes = {
  // actions are bje properties 
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
 
}


const mapStateToProps = (state) => ({
profile: state.profile,
  errors: state.errors
});



export default connect(mapStateToProps)(CreateProfile);