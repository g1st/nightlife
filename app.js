const express = require('express');
const passport = require('passport');
const config = require('./config/secret.js');
require('dotenv').config({
  path: 'variables.env'
});
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// create application/x-www-form-urlencoded parser
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// static files in public directory
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug');

// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

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

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
