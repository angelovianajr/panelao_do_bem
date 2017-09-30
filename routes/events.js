var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('events/index', { title: 'Eventos' });
});

/* POST register events. */
router.get('/', function(req, res, next) {
  console.log(req.body);
  res.sendStatus(201);
});

/* GET list user events. */
router.get('/', function(req, res, next) {
  res.send('Evento mockado');
  res.sendStatus(200);
});

module.exports = router;
