const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.login = (req, res) => {
  res.render('login', {
    title: 'Login'
  });
};

exports.signup = (req, res) => {
  res.render('signup', {
    title: 'Signup'
  });
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

exports.loginFormValidation = (req, res, next) => {
  const errors = validationResult(req);
  // console.log(errors.mapped());
  if (!errors.isEmpty()) {
    // TODO: flash errors nicely
    // return res.status(422).json({
    //   errors: errors.mapped()
    // });
    return res.render('login', { title: 'Login', body: req.body });
  }
  next();
};

exports.signMe = async (req, res, next) => {
  const errors = validationResult(req);
  // console.log(errors.mapped());
  if (!errors.isEmpty()) {
    // TODO: flash errors nicely
    // return res.status(422).json({
    //   errors: errors.mapped()
    // });
    return res.render('signup', {
      title: 'Signup',
      body: req.body
    });
  }

  const userAlreadyExists = await User.findOne({
    email: req.body.email
  });

  if (userAlreadyExists) {
    console.log('username already exists');
    // flash error that emial already exists
    return res.render('signup', {
      title: 'Signup',
      body: req.body
    });
  }

  const user = new User({
    email: req.body.email,
    name: req.body.name
  });

  // this register method is from passportLocalMongoose

  // callback style commented and promisify library used below to avoid callbacks
  // User.register(user, req.body.password, (err, user) => {
  //   if (err) {
  //     console.error(err);
  //     return;

  //   }
  //   console.log('user registered successfully');
  //   return res.send('it works')
  // })

  const registerWithPromise = promisify(User.register, User);
  await registerWithPromise(user, req.body.password);
  // all good, pass to authController's login
  next();
};

exports.loginValidator = [
  body('email', 'Email address is not valid').isEmail(),
  body('password')
    .isLength({
      min: 8,
      max: undefined
    })
    .withMessage('Password must be at least 8 characters long.')
];

exports.signupValidator = [
  body('email', 'Email address is not valid').isEmail(),
  body('name', 'Must provide a name.')
    .not()
    .isEmpty()
    .trim(),
  body('password')
    .isLength({
      min: 8,
      max: undefined
    })
    .withMessage('Password must be at least 8 characters long.'),
  body('password-confirm')
    .isLength({
      min: 8,
      max: undefined
    })
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
