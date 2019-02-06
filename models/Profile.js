const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create database Schema for user profile information


const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users' //collection reference
    },
    handle: {
        type: String,
        required: true,
        max: 40
    },
    company: {
        type: String,
    },
    website: {
        type: String,
    },
    location: {
        type: String,
    },
    status: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String,
    },
    experience: [
        {
            title: {
                type: String,
            },
            company: {
                type: String
            }
        }],
    education: [
        {
            school: {
                type: String,
            },
            degree: {
                type: String
            }
        }],
    date: {
        type: Date,
        default: Date.now
    }

});

// this will make the users collection for mongodb
module.exports = Profile = mongoose.model('profile', ProfileSchema);