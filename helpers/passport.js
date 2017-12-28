const passport = require('passport');
const User = require('../models/User');
const mongoose = require('mongoose');

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());