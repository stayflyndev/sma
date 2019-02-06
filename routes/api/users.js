const express = require('express');
const gravatar = require('gravatar');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// validator
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


// load in the usermoder
const User = require('../../models/User');


// @route GET api/users/test
// testing a route to users
// this is a public route

router.get('/test', (req, res) => res.json({ msg: "users works" }));




// @route GET api/users/register
// register
// this is a public route
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors);
    }

    // find User based on email, if not create a user object with name email avatar and password

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                errors.email = "email alread exists"
                return res.status(400).json(errors);
            } else {

                const avatar = gravatar.url(req.body.email,
                    {
                        s: '200', //size
                        r: 'pg', // rating
                        d: 'mm' // default
                    })

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                });

                // takes the password and hashes it which is stored on the db. so the hash is compared to be true or false

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => res.json(user)) //user that is created send back the user data
                            .catch(user => console.log(err)) // in case something is wrong, show error
                    });
                });

            }
        })
})


// @route post api/users/login
// login user / returning the JSONwebtoken
// this is a public route
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then(user => {

            // check if the user exists in the database 
            if (!user) {
                errors.email = "Email not found"
                return res.status(404).json(errors);

            }
            bcrypt.compare(password, user.password) //compare form password with hashpassword
                .then(isMatch => {
                    if (isMatch) {
                        // user matches
                        const payload = { id: user.id, name: user.name, avatar: user.avatar } // you pick options to pass as payload. the more options can slow down the app. jwtpayload


                        jwt.sign(payload, keys.secretOrKey, { expiresIn: '1d' }, (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            });
                        });

                    } else {
                        errors.password = "Incorrect password"
                        return res.status(400).json(errors);
                    }
                });

            // check password 

        });
    // find user by email 
});


// @route GET api/users/currentuser
// returns the current user (whos signed in )
// this is a private route{
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email

    })
});


module.exports = router;

