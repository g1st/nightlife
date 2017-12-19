const express = require('express');
const index = require('./routes/index.js');
const config = require('./config/secret.js');
// const yelp = require('yelp-fusion');
require('dotenv').config({ path: 'variables.env' });

const app = express();

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug');

app.use('/', index);

// const searchRequest = {
//   categories: 'nightlife',
//   latitude: 54.8985207,
//   longitude: 23.90359650000005,
//   radius: 20000,
//   price: '1, 2, 3, 4'
// };

// yelp
//   .accessToken(config.yelp.clientId, config.yelp.clientSecret)
//   .then(response => {
//     console.log(response.jsonBody.access_token);
//     const client = yelp.client(response.jsonBody.access_token);
//     client.search(searchRequest).then(response => {
//       const firstResult = response.jsonBody.businesses;
//       // console.log(firstResult);
//       const prettyJson = JSON.stringify(firstResult, null, 4);
//       console.log(prettyJson);
//     });
//   })
//   .catch(e => {
//     console.log(e);
//   });

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
