const express = require('express');
const passport = require('passport');
require('dotenv').config({
  path: 'variables.env'
});
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const morgan = require('morgan');
const flash = require('connect-flash');
const helmet = require('helmet');

const app = express();

// protects from most common web vulnerabilities like xss
app.use(helmet());

// logger for dev
app.use(morgan('dev'));

// create application/x-www-form-urlencoded parser
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.use(cookieParser());

// handlings CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// static files in public directory
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug');

app.use(
  session({
    secret: process.env.session_secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false
    }
  })
);

// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

mongoose.connect(
  `mongodb://${process.env.mongodb_user}:${
    process.env.mongodb_pass
  }@ds131137.mlab.com:31137/nightlife`,
  {
    useMongoClient: true
  }
);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
require('./models/User');
require('./helpers/passport.js');

const index = require('./routes/index.js');
app.use('/', index);

// handle bad requests
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// handle other errors
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
