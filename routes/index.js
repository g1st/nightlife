const router = require('express').Router();
const searchController = require('../controllers/searchController.js');
const userController = require('../controllers/userController.js');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/api/places', searchController.searchBusiness);

router.get('/login', userController.login);
router.get('/signup', userController.signup);

router.post('/login', userController.loginValidator, userController.signMe);
router.post('/signup', userController.signupValidator, userController.signMe);

module.exports = router;
