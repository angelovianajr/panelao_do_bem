var express = require('express');
var router = express.Router();
var Event = require('../models/event');
var User = require('../models/user');
var Offer = require('../models/offer');
var Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('events/index', { title: 'Eventos' });
});

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
    User.findById('59cefb0f537c562d1b221f29', function(err, user) {
      if(!user) {
        return res.status(404).json({ msg: 'Usuário não existente.'})
      }
      user.save(function(err) {
        if(err)
          return res.status(400).json(err);
<<<<<<< HEAD
        res.status(200).json({ msg: "ok", id: event._id })
=======
        
        res.status(200).json({ event: ev, msg: "ok" })
>>>>>>> ecb457a75a472e160d3063e1f05d63a3cbc126cb
      });
    });
  });
});

/* GET products */
router.get('/products', function(req, res, next) {
  Product.find(function(err, produto) {
    if(produto.length) {
      res.status(200).json(produto);
    } else {
      res.status(404).json({ msg: 'Nenhum produto encontrado.' })
    }
  })
})

/* GET list user events. */
router.get('/events-by-user', function(req, res, next) {
  User.findById(req.session.user, function(err, user) {
    if(user) {
      Event.find({_id: {$in: user.events}}, function(err, ev) {
        res.status(200).json(ev);
      });
    } else {
      res.status(404).json({ msg: 'Não foram encontrados eventos para o seu usuário.' });
    }
  })
});

router.get('/:id/recipes', function(req, res, next) {
  Event.findById(req.params.id, function(err, event) {
    res.render('events/recipes', { title: 'Eventos - Receitas', recipe: event.recipe, eventId: req.params.id });
  });
});

/* POST recipe register. */
router.post('/:id/recipes', function(req, res, next) {
<<<<<<< HEAD
  
=======
>>>>>>> ecb457a75a472e160d3063e1f05d63a3cbc126cb
  Event.findById(req.params.id, function(err, ev){
    if(req.body.recipe) {
      ev.recipe.name = req.body.recipe.name;
      ev.save(function(err) {
        if(err) {
          console.log(err);
          res.status(400).json({ msg: 'Problema ao salvar receita.' })
        } else {
          return res.status(200).json(req.body.recipe)
        }
      })
    } else {
      return res.status(400).json({ msg: 'Campo de receitas inválido.' })
    }
  })
});

/* POST offers register. */
router.post('/:id/offers', function(req, res, next) {
<<<<<<< HEAD
  User.findById(req.params.id, function(err, user) {
    if(user) {
    }
  })
  res.status(201).json('Oferta criada');
=======
  Event.findById(req.params.id, function(err, ev){
    if (ev.recipe.length == 0) {
      ev.recipe = {};
    }
    if(req.body.ofertas) {
      ev.recipe.offers = req.body.recipe.offers;
    }
    console.log(ev);
    ev.save(function(err) {
      if(err) {
        console.log(err);
        res.status(400).json({ msg: 'Problema ao salvar receita.' })
      }
    });
  });
>>>>>>> ecb457a75a472e160d3063e1f05d63a3cbc126cb
});

/* GET offers by ML. */
router.get('/:id/offers', function(req, res, next) {
  res.render('events/offers', { title: 'Eventos - Ofertas', eventId: req.params.id })
});

router.get('/map', function(req, res, next) {
  res.status(200).render('events/map', { title: 'Recipes'})
})

module.exports = router;
