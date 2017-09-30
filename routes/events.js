var express = require('express');
var router = express.Router();
var Event = require('../models/event');
var User = require('../models/user');
var Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('events/index', { title: 'Eventos' });
});

/* POST register events. */
router.post('/', function(req, res, next) {

  var event = new Event({
    title: req.body.title,
    location: [req.body.location.latitude, req.body.location.longitude]
  });

  event.save(function(err, ev) {
    if(err) res.status(400).json(err);
    User.findById('59cefb0f537c562d1b221f29', function(err, user) {
      if(user) {
        user.events.push(ev);
        user.save(function(err) {
          if(err) res.status(400).json(err);
          else res.status(201).json({ message: 'Evento registrado.' });
        });
      } else {
        res.status(404).json({ message: 'Usuário não existente.'})
      }
    });
  });
});

/* GET products */
router.get('/products', function(req, res, next) {
  Product.find(function(err, prod) {
    if(prod.length) {
      res.status(200).json(prod);  
    } else {
      res.status(404).json({ message: 'Nenhum produto encontrado.' })
    }
  })
})

/* GET list user events. */
router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if(user) {
      Event.find({_id: {$in: user.events}}, function(err, ev) {
        res.status(200).json(ev);
      });
    } else {
      res.status(404).json({ message: 'Não foram encontrados eventos para o seu usuário.' });
    }
  })
});

/* POST recipe register. */
router.post('/:id/recipe', function(req, res, next) {
  Event.findById(req.params.id, function(err, ev){ 
    if(req.body.recipe) {
      ev.recipe = req.body.recipe;
      ev.save(function(err) {
        if(err) {
          res.status(400).json({ message: 'Problema ao salvar receita.' })
        }
      })
    } else {
      res.status(400).json({ message: 'Campo de receitas inválido.' })
    }
  })
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
