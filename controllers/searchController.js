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
      return res.json({
        places,
        data: data.businesses
      });
    })
    .catch(err => console.error(err));

  // yelp.autoComplete(params);
  // yelp
  //   .autoComplete({ text: 'ice cream' })
  //   .then(results => console.log(results));
};

exports.peopleGoing = async (req, res) => {
  const place = await Place.findOne({
    placeId: req.params.id
  });
  if (!place) {
    // create place and add username to going list
    const plc = await new Place({
      placeId: req.params.id,
      users: [req.user.email]
    }).save();
    return res.json({ plc });
  }
  // check if user is in going list
  // if he is - remove from the list and peopleGoing -1
  if (place.users.includes(req.user.email)) {
    const update = await Place.findOneAndUpdate(
      { placeId: req.params.id },
      {
        $inc: { peopleGoing: -1 },
        $pull: { users: req.user.email }
      }
    );
    return res.json({ update });
  } else {
    // if he is not - add to the usernames list and +1 poepleGoing
    const update = await Place.findOneAndUpdate(
      { placeId: req.params.id },
      {
        $inc: { peopleGoing: +1 },
        $push: { users: req.user.email }
      }
    );
    return res.json({ update });
  }
};
