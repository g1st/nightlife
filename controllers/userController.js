const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.login = (req, res) => {
  res.render('login', { title: 'Login' });
};

exports.signup = (req, res) => {
  res.render('signup', { title: 'Signup' });
};

exports.signMe = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // TODO: flash errors nicely
    // return res.status(422).json({ errors: errors.mapped() });
    return res.render('signup', { title: 'Signup', body: req.body });
  }
  // all good
  res.redirect('/');
};

exports.loginValidator = [
  body('email', 'Email address is not valid').isEmail(),
  body('password')
    .isLength({ min: 8, max: undefined })
    .withMessage('Password must be at least 8 characters long.')
];

exports.signupValidator = [
  body('email', 'Email address is not valid').isEmail(),
  body('name', 'Name must contain at least 2 characters.')
    .not()
    .isEmpty()
    .trim(),
  body('password')
    .isLength({ min: 8, max: undefined })
    .withMessage('Password must be at least 8 characters long.'),
  body('password-confirm')
    .isLength({ min: 8, max: undefined })
    .withMessage('Confirmed password must be at least 8 characters long.'),
  sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  }),
  body('password-confirm', 'Passwords do not match.')
    .exists()
    .custom((value, { req }) => value === req.body.password)
];
