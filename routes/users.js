var express = require('express');
var router = express.Router();

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
  console.log(req.body);
  res.sendStatus(201);
});


module.exports = router;
