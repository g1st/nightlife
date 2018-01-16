const passport = require('passport');
const crypto = require('crypto'); // already installed with node
const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');

exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  // failureFlash: 'Failed Login!',
  successRedirect: '/'
  // successFlash: 'You are now logged in!'
});

// exports.login = (req, res, next) => {
//   passport.authenticate('local', function(err, user, info) {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       return res.redirect('/login');
//     }
//     req.logIn(user, function(err) {
//       if (err) {
//         return next(err);
//       }
//       return res.redirect('/');
//     });
//   })(req, res, next);
// };

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }
  // req.flash('error', 'You need to log in in order to do that!');
  console.log('you are not logged in');
  return res.redirect('/login');
};
