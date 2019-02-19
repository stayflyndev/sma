import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFG from '../common/TextFG';
import TextAreaFG from '../common/TextAreaFG';
import SelectList from '../common/SelectList';
import{withRouter} from 'react-router-dom';
import {createProfile} from '../../actions/profileActions'


class CreateProfile extends Component {
    constructor(props) {
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
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
          this.setState({errors: nextProps.errors})
        }
      }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value }) //name is the attribute of the input form
    }

    onSubmit = (event) => {
        event.preventDefault();
     
          const profileData = {
              handle: this.state.handle,
              company: this.state.company,
              website: this.state.website,
              location: this.state.location,
              status: this.state.status,
              skills: this.state.skills,
              bio: this.state.bio,
          }
         this.props.createProfile(profileData, this.props.history);

    }


    render() {

        // select options for the status
        const options =
            [
                {
                    label: 'Select professional status', value: 0
                },
                {
                    label: 'Artist', value: 'Artist'
                },
                {
                    label: 'Technology', value: 'Technology'
                },
                {
                    label: 'Musician', value: 'Musician'
                },
                {
                    label: 'Customer Service', value: 'Customer Service'
                }
            ]

        const { errors } = this.state;

        return (

            <div className="createprofile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1> CREATE YOUR profile </h1>

                        </div></div></div>
                <form onSubmit={this.onSubmit}>
                    <TextFG
                        placeholder=" profile handle"
                        name="handle"
                        value={this.state.handle}
                        onChange={this.onChange}
                        error={errors.handle}
                        info="a unique handle for your profile"
                    />

                    <SelectList
                        placeholder="status"
                        name="status"
                        value={this.state.status}
                        onChange={this.onChange}
                        errors={errors.status}
                        options={options}
                        info="What is your current occupation"

                    />

                    <TextFG
                        placeholder="company"
                        name="company"
                        value={this.state.company}
                        onChange={this.onChange}
                        error={errors.company}
                        info="What company do you work for"
                    />

                    <TextFG
                        placeholder=" website "
                        name="website"
                        value={this.state.website}
                        onChange={this.onChange}
                        error={errors.website}
                        info="your website"
                    />

                    <TextFG
                        placeholder="location"
                        name="location"
                        value={this.state.location}
                        onChange={this.onChange}
                        error={errors.location}
                        info="your location"
                    />

                    <TextFG
                        placeholder=" skills"
                        name="skills"
                        value={this.state.skills}
                        onChange={this.onChange}
                        error={errors.skills}
                        info="what are your skills. Use commas to seperate skill set"
                    />
                    <TextAreaFG
                        placeholder=" bio"
                        name="bio"
                        value={this.state.bio}
                        onChange={this.onChange}
                        error={errors.bio}
                        info="Tell us about yourself and your uniquness"


                    />



                <input type="submit" value="submit" className="btn btn-info mt-4" />


                </form>


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



export default connect(mapStateToProps, {createProfile})(withRouter(CreateProfile));