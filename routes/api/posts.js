const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');



const router = express.Router();

const Post = require("../../models/Post");
const ValidatePostInput = require('../../validation/post');

// @route GET api/posts/test
// testing a route to post
// this is a public route
router.get('/test', (req, res) => res.json({msg: "posts works"}));




// @route post api/posts/
// post a comment
// this is a public route

router.get('/', (req, res) => {

Post.find()
.sort({date: -1})
.then(posts => res.json(posts))
.catch(err => res.status(404).json({ nopost: " no posts found "}));
    

});



// @route post api/posts/ by id
// post a comment
// this is a public route

router.get('/:id', (req, res) => {

    const errors = {};

    Post.findById({post : req.params.id })
    .populate('user', ['name', 'avatar'])
    .then(post =>  res.json(post))
       .catch(err => res.status(404).json({ nopost: " no post found "}));
    
    });




// @route post api/posts/
// post a comment
// this is a private route

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { errors, isValid } = ValidatePostInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

const newPost = new Post ({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
});

newPost.save().then(post => res.json(post));

});


// @route delete api/posts/
// post a comment
// this is a private route


router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

     Profile.findOne({ user: req.user.id })
     .then(profile => { 
        Post.findById(req.params.id)
       .then(post => {
        if(post.user.toString() !== req.user.id) {
            return res.status(401).json({ notauth: " not authorized to delete this post"})
        }

        post.remove().then(() => res.json({ success: true }))

       })

    .catch(err => res.status(404).json(err));

});

});




// @route post  api/like/
// like a post
// this is a private route


router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Profile.findOne({ user: req.user.id })
    .then(profile => { 
       Post.findById(req.params.id)
      .then(post => {

        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){

            return res.status(400).json({ alreadyliked: "already lilked"});
        }
        
        post.likes.unshift({user: req.user.id});
        post.save().then(post => res.json(post));
    //    if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0  )
    //    {
    //     return res.status(400).json({ alreadyliked: "this is already liked"});
    //    }
        // post.likes.unshift({ user: req.user.id});
        // post.save.then(post => res.json(post));

      })

  .catch(err => res.status(404).json(err));

});

});



router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Profile.findOne({ user: req.user.id })
    .then(profile => { 
       Post.findById(req.params.id)
      .then(post => {

        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){

            return res.status(400).json({ notliked: "this is not liked"});
        }
        
        const removeIndex = post.likes
        .map(item => item.user.toString())
        .indexOf(req.user.id);

        // splice out of array
        post.likes.splice(removeIndex, 1);

        post.save().then(post => res.json(post));

      })

  .catch(err => res.status(404).json(err));

});

});




module.exports = router;