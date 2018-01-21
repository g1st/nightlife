const Yelp = require('node-yelp-api-v3');
const config = require('../config/secret');
const Place = require('../models/Place');

exports.searchBusiness = async (req, res) => {
  const yelp = new Yelp({
    consumer_key: config.yelp.clientId,
    consumer_secret: config.yelp.clientSecret
  });

  const places = await Place.find({});

  yelp
    .searchBusiness({
      categories: 'nightlife',
      latitude: req.query.lat,
      longitude: req.query.lng,
      price: '1, 2, 3, 4'
    })
    .then(data => {
      console.log(data);
      return res.json({
        places,
        data: data.businesses,
        total: data.total
      });
    })
    .catch(err => console.error(err));
};

exports.peopleGoing = async (req, res) => {
  const place = await Place.findOne({
    placeId: req.params.id
  });
  if (!place) {
    // create place and add username to going list
    const newPlace = await new Place({
      placeId: req.params.id,
      users: [req.user.email]
    }).save();
    return res.json({ newPlace });
  }

  const add = ['1', '$push'];
  const remove = ['-1', '$pull'];

  const [increaser, operator] = place.users.includes(req.user.email)
    ? remove
    : add;

  const update = await Place.findOneAndUpdate(
    { placeId: req.params.id },
    {
      $inc: { peopleGoing: increaser },
      [operator]: { users: req.user.email }
    },
    { new: true }
  );
  return res.json({ update });
};
