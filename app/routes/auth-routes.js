var authController = require('../controllers/authcontroller.js');

module.exports = function(app, passport) {

    // GET request for /dashboard, render dashboard if the user is already logged in
    // -- goes to the authcontroller
    app.get('/vendor', isLoggedIn, authController.dashboard);

    // GET request for /logout -- goes to the authcontroller
    app.get('/logout', authController.logout);

    // POST request for /signup -- goes to the passport local-signup
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));

    // POST request for /signin -- goes to the passport local-signin
    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin'
    }));

    // Helper function to check if the user is pre-authenticated
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/signin');
    }
}