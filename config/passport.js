// config/passport.js

// load all the things we need
var LocalStrategy = require('passport-local').Strategy,
    VKStrategy = require('passport-vkontakte').Strategy,
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    FacebookStrategy = require('passport-facebook').Strategy;

// load up the user model
var User            = require('../models/user');
var config          = require('./oauth');
// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session
    // passport config

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use(User.createStrategy());
    
    // used to serialize the user for the session
    passport.serializeUser(User.serializeUser());

    // used to deserialize the user
    passport.deserializeUser(User.deserializeUser());

    // passport.serializeUser(function(user, done) {
    //     done(null, user.id);
    // });

    // // used to deserialize the user
    // passport.deserializeUser(function(id, done) {
    //     User.findById(id, function(err, user) {
    //         done(err, user);
    //     });
    // });

    //for Auth startegies
    passport.use(new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL,
        profileFields: ['id', 'displayName','name', 'email'],
        passReqToCallback : true
      },
    function(req, token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // check if the user is already logged in
            if (!req.user) {

                // find the user in the database based on their facebook id
                User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

                    // if there is an error, stop everything and return that
                    // ie an error connecting to the database
                    if (err)
                        return done(err);

                    // if the user is found, then log them in
                    if (user) {
                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user found with that facebook id, create them
                        var newUser            = new User();

                        // set all of the facebook information in our user model
                        newUser.facebook.id    = profile.id; // set the users facebook id                   
                        newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
                        newUser.facebook.name  = profile.name; // look at the passport user profile to see how names are returned
                        newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
                        newUser.email = newUser.facebook.email;
                        newUser.displayName=profile.displayName;
                        newUser.name=profile.name;
                        console.log(newUser);

                        // newUser.save(function(err) {
                        //     console.log('saving...');
                        //     if (err)
                        //         throw err;

                        //     // if successful, return the new user
                        //     console.log('successful');
                        //     return done(null, newUser);
                        // });

                        User.register(newUser, 'hhh', function(err, user) {
                            console.log('saving with register...');
                            if (err)
                                throw err;

                            // if successful, return the new user
                            console.log('successful');
                            return done(null, user);
                        });
                    }

                });

            } else {
                // user already exists and is logged in, we have to link accounts
                var user            = req.user; // pull the user out of the session

                // update the current users facebook credentials
                user.facebook.id    = profile.id;
                user.facebook.token = token;
                user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                user.facebook.email = profile.emails[0].value;

                // save the user
                user.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });
            }

        });

    }));

    passport.use(new GoogleStrategy({

        clientID        : config.google.clientID,
        clientSecret    : config.google.clientSecret,
        callbackURL     : config.google.callbackURL,
        passReqToCallback : true


    },
    function(req, token, refreshToken, profile, done) {

        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {
            console.log(profile);
            if(!req.user){
                User.findOne({ 'google.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {

                        // if a user is found, log them in
                        return done(null, user);
                    } else {
                        // if the user isnt in our database, create a new user
                        var newUser          = new User();

                        // set all of the relevant information
                        newUser.google.id    = profile.id;
                        newUser.google.token = token;
                        newUser.google.name  = profile.displayName;
                        newUser.google.email = profile.emails[0].value; // pull the first email
                        newUser.displayName = newUser.google.name;
                        newUser.email = newUser.google.email;
                        // save the user
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });

            }
            else{
                var user = req.user;
                user.google.id = profile.id;
                user.google.token = token;
                user.google.email = profile.emails[0].value;
                user.google.name= profile.name;
                user.save(function(err){
                    if(err)
                        throw err;
                    return done(null, user);
                })

            }
            // try to find the user based on their google id
        });

    }));

    passport.use(new VKStrategy({

        clientID        : config.vk.clientID,
        clientSecret    : config.vk.clientSecret,
        callbackURL     : config.vk.callbackURL,
        passReqToCallback : true


    },
    function(req, token, refreshToken, profile, done) {

        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {
            console.log(profile);
            if(!req.user){
                User.findOne({ 'vk.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {

                        // if a user is found, log them in
                        return done(null, user);
                    } else {
                        // if the user isnt in our database, create a new user
                        var newUser          = new User();

                        // set all of the relevant information
                        newUser.vk.id    = profile.id;
                        newUser.vk.token = token;
                        newUser.vk.name  = profile.displayName;
                        newUser.vk.email = profile.emails[0].value; // pull the first email
                        newUser.displayName = newUser.vk.name;
                        newUser.email = newUser.vk.email;
                        // save the user
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });

            }
            else{
                var user = req.user;
                user.vk.id = profile.id;
                user.vk.token = token;
                user.vk.email = profile.emails[0].value;
                user.vk.name= profile.name;
                user.save(function(err){
                    if(err)
                        throw err;
                    return done(null, user);
                })

            }
            // try to find the user based on their google id
        });

    }));

};