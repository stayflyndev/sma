const express = require('express');

const router = express.Router();

// @route GET api/users/test
// testing a route to users
// this is a public route

router.get('/test', (req, res) => res.json({msg: "users works"}));




module.exports = router;

