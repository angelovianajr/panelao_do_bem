var express = require('express');
var router = express.Router();
var Event = require('../models/event');
var User = require('../models/user');
var Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('events/index', { title: 'Eventos' });
});

router.get('/recipes', function(req, res, ext){
  res.render('events/recipes', { title: 'Recipes' })
})

/* GET home page. */
router.get('/register', function(req, res, next) {
  res.render('events/register', { title: 'Eventos' });
});

/* POST register events. */
router.post('/', function(req, res, next) {
  var event = new Event({
    title: req.body.title,
    location: [req.body.coordinates]
  });

  event.save(function(err, ev) {
    if(err) res.status(400).json(err);
    var id = '59cefb0f537c562d1b221f29';
    User.findById(id, function(err, user) {
      if(!user) {
        return res.status(404).json({ msg: 'Usuário não existente.'})
      }
      user.save(function(err) {
        if(err) 
          return res.status(400).json(err);

        res.status(200).json({ msg: "ok", id: id })
      });
    });
  });
});

/* GET products */
router.get('/products', function(req, res, next) {
  Product.find(function(err, prod) {
    if(prod.length) {
      res.status(200).json(prod);  
    } else {
      res.status(404).json({ msg: 'Nenhum produto encontrado.' })
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
      res.status(404).json({ msg: 'Não foram encontrados eventos para o seu usuário.' });
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
          res.status(400).json({ msg: 'Problema ao salvar receita.' })
        }
      })
    } else {
      res.status(400).json({ msg: 'Campo de receitas inválido.' })
    }

    res.render('events/offers', { title: 'Eventos - Ofertas' })
  })
});

/* POST offers register. */
router.post('/:id/offers', function(req, res, next) {
  res.status(201).json('Oferta criada');

  res.render('events/drivers', { title: 'Eventos - Motoristas' })
});

/* GET offers by ML. */
router.get('/:id/offers', function(req, res, next) {
  res.status(200).json('Ofertas mockadas');
});

module.exports = router;
