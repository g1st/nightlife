const fetch = require('node-fetch');
const Place = require('../models/Place');

exports.searchBusiness = async (req, res) => {
  const places = await Place.find({});

  const [lat, lng] = [req.query.lat, req.query.lng];

  const url = `https://api.yelp.com/v3/businesses/search?categories=nightlife&price=1, 2, 3, 4&latitude=${lat}&longitude=${lng}`;

  fetch(url, {
    headers: { authorization: `Bearer ${process.env.yelp_API_KEY}` }
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      return res.json({
        places,
        data: data.businesses,
        total: data.total
      });
    });
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
