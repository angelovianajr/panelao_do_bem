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

/* POST user register. */
router.get('/register', function(req, res, next) {
  req.body;
  res.sendStatus(200)
});

module.exports = router;
