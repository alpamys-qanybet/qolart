var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var router = express.Router();
var flash    = require('connect-flash');


router.get('/', function (req, res) {
    res.render('index', { user : req.user });
});

router.get('/register', function(req, res) {
    res.render('register', { message: req.flash('registerMessage') });
});

router.post('/register', function(req, res) {
    User.register(new User({ displayName : req.body.fname+' '+req.body.lname, name : {familyName: req.body.fname, givenName: req.body.lname,
     middleName : req.body.mname}, email : req.body.email }), req.body.password, function(err, user) {
        if (err) {
            return res.render('register', { user : user });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user});
});

router.post('/login', passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   })
);

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

router.get('/auth/facebook',
  passport.authenticate('facebook',{ scope: 'email' }));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

router.get('/connect/facebook', passport.authorize('facebook', { scope: 'email' }));

// handle the callback after facebook has authorized the user
router.get('/connect/facebook/callback',
    passport.authorize('facebook', {
        successRedirect : '/',
        failureRedirect : '/'
    }));

router.get('/auth/google',
  passport.authenticate('google',{ scope: 'email' }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

router.get('/connect/google', passport.authorize('google', { scope: 'email' }));

// handle the callback after facebook has authorized the user
router.get('/connect/google/callback',
    passport.authorize('google', {
        successRedirect : '/',
        failureRedirect : '/'
    }));

router.get('/auth/vkontakte',
  passport.authenticate('vkontakte',{ scope: 'email' }));

router.get('/auth/vkontakte/callback',
  passport.authenticate('vkontakte', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

router.get('/connect/vkontakte', passport.authorize('vkontakte', { scope: 'email' }));

// handle the callback after facebook has authorized the user
router.get('/connect/vkontakte/callback',
    passport.authorize('vkontakte', {
        successRedirect : '/',
        failureRedirect : '/'
    }));
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
module.exports = router;