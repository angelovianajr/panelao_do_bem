var express = require('express');
var router = express.Router();

/* GET login layout. */
router.get('/login', function(req, res, next) {
  res.render('users/login', { title: 'Login' });
});

/* GET signup layout. */
router.get('/signup', function(req, res, next) {
  res.render('users/signup', { title: 'Cadastro' });
});

module.exports = router;
