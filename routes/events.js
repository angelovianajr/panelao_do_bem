var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('events/index', { title: 'Eventos' });
});

/* POST register events. */
router.get('/', function(req, res, next) {
  res.status(200).json('Evento mockado');
});

/* GET list user events. */
router.get('/', function(req, res, next) {
  res.status(200).json('Evento mockado');
});

/* POST recipe register. */
router.post('/:id/recipe', function(req, res, next) {
  res.status(201).json('Receita cadastrada')
});

/* GET recipes by user. */
router.get('/:id/recipe', function(req, res, next) {
  res.status(200).json('Receitas mockadas');
});

/* POST offers register. */
router.post('/:id/offers', function(req, res, next) {
  res.status(201).json('Oferta criada');
});

/* GET offers by ML. */
router.get('/:id/offers', function(req, res, next) {
  res.status(200).json('Ofertas mockadas');
});

/* GET offers by ML. */
router.get('/:id/drivers', function(req, res, next) {
  res.status(200).json('Motoristas mockados');
});

module.exports = router;
