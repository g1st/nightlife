const express = require('express');
const index = require('./routes/index.js');
const config = require('./config/secret.js');
require('dotenv').config({ path: 'variables.env' });
const bodyParser = require('body-parser');

const app = express();

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// static files in public directory
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug');

app.use('/', index);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
