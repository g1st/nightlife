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
