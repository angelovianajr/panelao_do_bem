var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET login layout. */
router.get('/login', function(req, res, next) {
  res.render('users/login', { title: 'Login' });
});

router.get('/register', function(req, res, next) {
  res.render('users/register', { title: 'Registro' });
});


/* GET signup layout. */
router.get('/signup', function(req, res, next) {
  res.render('users/signup', { title: 'Cadastro' });
});

/* POST user register. */
router.post('/register', function(req, res, next) {
  var user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })

  user.save(function(res) {
    if(res) res.sendStatus(404);
  })
});


module.exports = router;
