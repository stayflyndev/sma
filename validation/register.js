const Validator = require('validator');
const isEmpty = require('./is-empty');


// data entered from the form
module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : ""; 
    data.email = !isEmpty(data.email) ? data.email : ""; 
    data.password = !isEmpty(data.password) ? data.password : ""; 
    data.passwordtwo = !isEmpty(data.passwordtwo) ? data.passwordtwo : ""; 

    if(!Validator.isLength(data.name, {min: 2, max: 30}))
{
    errors.name = "Name must be 2 and 30 characters";
}

if(Validator.isEmpty(data.name)){
    errors.name = "Name field is required"
}


if(Validator.isEmpty(data.email)){
    errors.email = "Email field is required"
}


if(!Validator.isEmail(data.email)){
    errors.email = "Invalid Email"
}


if(Validator.isEmpty(data.password)){
    errors.password = "Password is required"
}

if(!Validator.isLength(data.password, {min: 6, max: 30}))
{
    errors.password = "Password must be 2 and 30 characters";
}


if(Validator.isEmpty(data.passwordtwo)){
    errors.passwordtwo = "Confirm Password is required"
}

if(!Validator.equals(data.password, data.passwordtwo)){
    errors.passwordtwo = "Passwords must match"


}

return {
    errors,
    isValid: isEmpty(errors)

}}


