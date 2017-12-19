const router = require('express').Router();
const controller = require('../controllers/searchController.js');
const bodyParser = require('body-parser');

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });
// create application/json parser
const jsonParser = bodyParser.json();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/api/places', urlencodedParser, controller.searchBusiness);

module.exports = router;
