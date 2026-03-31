const express = require('express');
const router = require('express').Router();
const passport = require('passport');

router.use('/fossils', require('./fossils'));
router.use('/', require('./swagger')); 

// Auth routes

// Login authentication route
router.get('/login', passport.authenticate('github'), (req, res) =>{});

// Logout route
router.get('/logout', function(req,res, next) {
    req.logout(function(err) {
        if (err) { return next(err);}
        res.redirect('/');
    });
});

router.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false
}), (req, res) => {
    // Successful authentication
    req.session.user = req.user; // Set the useron the session object
    res.redirect('/');
});

router.get('/', (req, res) => {
    res.send("Home page listening");
});

router.get('/oauth-callback', (req, res) => {
    res.send('logged in');
})

module.exports = router;