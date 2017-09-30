var express = require('express');
var router = express.Router();
var Offer = require('../models/offer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/offers', function(req, res, next) {
  Offer.find(function(err, results) {
    res.json({'offers': results})
  })
});

module.exports = router;
