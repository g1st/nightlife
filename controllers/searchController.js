const Yelp = require('node-yelp-api-v3');
const config = require('../config/secret.js');

exports.searchBusiness = (req, res) => {
  const yelp = new Yelp({
    consumer_key: config.yelp.clientId,
    consumer_secret: config.yelp.clientSecret
  });

  yelp
    .searchBusiness({
      categories: 'nightlife',
      latitude: req.query.lat,
      longitude: req.query.lng,
      price: '1, 2, 3, 4'
    })
    .then(results => {
      // console.log(results);
      res.send(results);
    })
    .catch(err => log.error(err));

  // yelp.autoComplete(params);
  // yelp
  //   .autoComplete({ text: 'ice cream' })
  //   .then(results => console.log(results));
};
