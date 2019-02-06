const Validator = require('validator');
const isEmpty = require('./is-empty');


// data entered from the form
module.exports = function validateProfileInput(data) {
    let errors = {};
    data.handle = !isEmpty(data.handle) ? data.handle : "";
    data.status = !isEmpty(data.status) ? data.status : "";
    data.skills = !isEmpty(data.skills) ? data.skills : "";

    
// required fields 
    if (!Validator.isLength(data.handle, {min: 2, max: 40})) {
        errors.handle = "Handle between 2 and 4 characters"
    }
    if (Validator.isEmpty(data.handle)){
        errors.handle = "Handle required"
    }

    if (Validator.isEmpty(data.status)) {
        errors.status = "status is required"
    }

    if (Validator.isEmpty(data.skills)) {
        errors.skills = "Skills required"
    }
    // optional 
    if(!isEmpty(data.website)){
        if(!Validator.isURL(data.website)){
            errors.website = "not a valid website";
        }
    }



    return {
        errors,
        isValid: isEmpty(errors)

    };
};


