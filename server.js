// server configuration using express 
const express = require('express');
const mongoose = require('mongoose');



// bring in routes to pages
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');





const app = express();

// db config to mlab
const db = require('./config/keys').mongoURI;

// connection to mlab using a promise. 
mongoose.connect(db)
.then( () => console.log("mongoDB connected"))
.catch(err => console.log(err));
 

app.get('/', (req, res) => res.send("Hello"));


app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);




const port = process.env.PORT || 5000;


// test server is running 
app.listen(port, () => console.log(` server running on ${port}`));
