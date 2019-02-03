// creates the profile of about the user

const express = require('express');

const router = express.Router();

// @route GET api/profile/test
// testing a route to profile
// this is a public route

router.get('/test', (req, res) => res.json({msg: "posts works"}));





module.exports = router;

