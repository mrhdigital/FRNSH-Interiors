  //load bcrypt - required for password encryption
  var bCrypt = require('bcrypt-nodejs');
  var db = require("../../models");
//   var emailutils = require('../../util/email.js');
  
  module.exports = function(passport, user) {
      // var User = user;
      var LocalStrategy = require('passport-local').Strategy;

      passport.serializeUser(function(user, done) {
        done(null, user);
      });
      
      passport.deserializeUser(function(user, done) {
        done(null, user);
      });

      passport.use('local-signup', new LocalStrategy({
              usernameField: 'email',
              passwordField: 'password',
              passReqToCallback: true // allows us to pass back the entire request to the callback
          },

          function(req, email, password, done) {
              var generateHash = function(password) {
                  return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
              };

              db.User.findOne({ where: { email: email } }).then(function(user) {
                  if (user) {
                      console.log("That email is already taken");
                      return done(null, false, { message: 'That email is already taken' });
                  } else {
                      var userPassword = generateHash(password);
                      var data = {
                          email: email,
                          password: userPassword,
                          firstname: req.body.firstname,
                          lastname: req.body.lastname
                      };

                      db.User.create(data).then(function(newUser, created) {
                          if (!newUser) {
                            console.log("Not a new user");
                            return done(null, false);
                          }
                          if (newUser) {
                            console.log("Created a new user");
                            return done(null, true);

                            // Send registration confirmation email to the user
                            // emailutils.email(req.body.firstname,req.body.lastname, email);
                            // return done(null, newUser);
                          }
                      });
                  }
              });
          }
      ));

      //LOCAL SIGNIN
      passport.use('local-signin', new LocalStrategy(
          {
              // by default, local strategy uses username and password, we will override with email
              usernameField: 'email',
              passwordField: 'password',
              passReqToCallback: true // allows us to pass back the entire request to the callback
          },

          function(req, email, password, done) {
              // var User = user;
              var isValidPassword = function(userpass, password) {
                  return bCrypt.compareSync(password, userpass);
              }
              db.User.findOne({ where: { email: email } }).then(function(user) {
                  if (!user) {
                      return done(null, false, { message: 'Email does not exist' });
                  }

                  if (!isValidPassword(user.password, password)) {
                      return done(null, false, { message: 'Incorrect password.' });
                  }

                  var userinfo = user.get();
                  return done(null, userinfo);

              }).catch(function(err) {
                  console.log("Error:", err);
                  return done(null, false, { message: 'Something went wrong with your Signin' });
              });
          }
      ));
  }