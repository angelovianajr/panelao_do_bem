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

/* POST recipe register. */
router.post('/:id/recipe', function(req, res, next) {
  console.log(req.body, req.params.id)
  res.sendStatus(201);
});

/* GET recipes by user. */
router.get('/:id/recipe', function(req, res, next) {
  console.log(req.params.id)
  res.send('Receita mockada');
  res.sendStatus(200);
});

/* POST offers register. */
router.post('/:id/offers', function(req, res, next) {
  console.log(req.body, req.params.id)
  res.sendStatus(201);
});

/* GET offers by ML. */
router.get('/:id/offers', function(req, res, next) {
  console.log(req.params.id)
  res.send('Ofertas mockadas');
  res.sendStatus(200);
});

/* GET offers by ML. */
router.get('/:id/drivers', function(req, res, next) {
  console.log(req.params.id)
  res.send('Motoristas disponíveis registrados');
  res.sendStatus(200);
});

module.exports = router;
