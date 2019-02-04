const express = require('express');
const gravatar = require('gravatar');
const router = express.Router();
const bcrypt = require('bcryptjs');


// load in the usermoder
const User = require('../../models/User');


// @route GET api/users/test
// testing a route to users
// this is a public route

router.get('/test', (req, res) => res.json({msg: "users works"}));




// @route GET api/users/register
// register
// this is a public route
router.post('/register', (req, res) => {
    
    // find User based on email, if not create a user object with name email avatar and password

    User.findOne({ email: req.body.email })
    .then(user => {
        if(user){
            return res.status(400).json({email: 'Email already exists'});
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
                        .then(user => res.json(user)) //user that is created send back the user
                        .catch(user => console.log(err)) // in case something is wrong, show error
        });
    });
    
}
})
})



module.exports = router;

