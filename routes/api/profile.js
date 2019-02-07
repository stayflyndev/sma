// creates the profile of about the user

const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');





// @route GET api/profile/test
// testing a route to profile
// this is a public route

router.get('/test', (req, res) => res.json({ msg: "posts works" }));





// @route GET current user profile
// testing a route to profile
// this is a private route
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id }) // find the profile using the objectID created from db
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.profile = "there is no profile for the user"
                return res.status(404).json(errors)
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json(err));
});


   // @route GET all profiles
// get all of the profile
// this is a public route
router.get('/all', (req, res) => {
    const errors = {};

    Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
        if(!profiles) {
            errors.noprofile = "there are no profiles";
            return res.status(404).json(errors);
        }
        res.json(profiles);
        
    })
        .catch(err => res.status(404).json({profiles: "there are no profiles here"}));
    });


// @route GET profile by :handle
// get profile by handle
// this is a public route
router.get('/handle/:handle', (req, res) => {
    const errors = {};
    Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
        if(!profile) {
            errors.noprofile = "there is no profile for the user";
            res.status(404).json(errors);
        }
        res.json(profile);
    })
        .catch(err => res.status(404).json(err));
    });


    // @route GET profile by :id
// get profile by user id
// this is a public route
router.get('/user/:user_id', (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
        if(!profile) {
            errors.noprofile = "there is no profile";
            res.status(404).json(errors);
        }
        res.json(profile);
    })
        .catch(err => res.status(404).json({profile: "there is nor profile found"}));
    });

    




// @route Post api/profile
// create a profile
// this is a private route
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { errors, isValid } = validateProfileInput(req.body);

    if(!isValid){
        // return errors 404 
        return res.status(400).json(errors);
    }
    //    get fields 
    const profileFields = {}; // all form info goes in here 
    profileFields.user = req.user.id;//includes user model information

    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',')

        Profile.findOne({ user: req.user.id })
            .then(profile => {
                if (profile) {
                    Profile.findOneAndUpdate(
                        { user: req.user.id },
                         { $set: profileFields },
                          { new: true })
                          .then(profile => res.json(profile));
                }else {


                    Profile.findOne({  handle: profileFields.handle})
                    .then(profile => {
                        if(profile) {
                            errors.handle = "the handle already exist";
                            res.status(400).json(errors);
                        }
                        new Profile(profileFields).save().then(profile => res.json(profile))

                    });
                }
            });


    }


});


// @route Post profile experience
// add experience to the profile
// this is a private route
router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { errors, isValid } = validateExperienceInput(req.body);

    if(!isValid){
        // return errors 404 
        return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }) // find the profile using the id from the token
         .then(profile => {
         const newExp = {
             title: req.body.title,
             company: req.body.company
         }
        //  add experience array
        profile.experience.unshift(newExp);
        profile.save().then(profile => res.json(profile));

        })
    });


    
// @route Post profile education
// add education to the profile
// this is a private route
router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { errors, isValid } = validateEducationInput(req.body);

    if(!isValid){
        // return errors 404 
        return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }) // find the profile using the id from the token
         .then(profile => {
         const newEdu = {
             school: req.body.school,
             degree: req.body.degree
         }
        //  add experience array
        profile.education.unshift(newEdu);
        profile.save().then(profile => res.json(profile));

        })
    });


       
// @route Post delete experience
// add education to the profile
// this is a private route
router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }), (req, res) => {

  
    Profile.findOne({ user: req.user.id })
    .then(profile => {

    

    const removeIndex = profile.experience //const set to a profile array experience 
    .map(item => item.id)
    .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);
    profile.save().then(profile => res.json(profile));
})
    .catch(err => res.status(404).json(err));

});


router.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }), (req, res) => {

  
    Profile.findOne({ user: req.user.id })
    .then(profile => {

    

    const removeIndex = profile.education //const set to a profile array experience 
    .map(item => item.id)
    .indexOf(req.params.exp_id);

    profile.education.splice(removeIndex, 1);
    profile.save().then(profile => res.json(profile));
})
    .catch(err => res.status(404).json(err));

});




module.exports = router;

