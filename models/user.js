var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    displayName: String,
    email: String,
    name:              {
     familyName: String,
     givenName: String,
     middleName: String 
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    vk               : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
});

var options = {usernameField: 'email'};

User.plugin(passportLocalMongoose, options);

module.exports = mongoose.model('users', User);