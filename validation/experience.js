const Validator = require('validator');
const isEmpty = require('./is-empty');


// data entered from the form
module.exports = function validateExperienceInput(data) {
    let errors = {};

    // sets to a string 
    data.title = !isEmpty(data.title) ? data.title : "";
    data.company = !isEmpty(data.company) ? data.company : "";


    if (Validator.isEmpty(data.title)) {
        errors.title = "Missing Title"
    }


    if (Validator.isEmpty(data.company)) {
        errors.company = "Missing company"
    }


    return {
        errors,
        isValid: isEmpty(errors)

    };
};