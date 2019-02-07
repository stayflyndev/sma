const Validator = require('validator');
const isEmpty = require('./is-empty');


// data entered from the form
module.exports = function validateExperienceInput(data) {
    let errors = {};

    // sets to a string 
    data.school = !isEmpty(data.school) ? data.school : "";
    data.degree = !isEmpty(data.degree) ? data.degree : "";


    if (Validator.isEmpty(data.school)) {
        errors.school = "Missing Title"
    }


    if (Validator.isEmpty(data.degree)) {
        errors.degree = "Missing company"
    }


    return {
        errors,
        isValid: isEmpty(errors)

    };
};