const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.user_id = !isEmpty(data.user_id) ? data.user_id : '';
    data.lastname = !isEmpty(data.lastname) ? data.lastname : '';
    data.major = !isEmpty(data.major) ? data.major : '';
    data.department = !isEmpty(data.department) ? data.department : '';
    data.username = !isEmpty(data.username) ? data.username : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}