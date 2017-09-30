var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET login layout. */
router.get('/login', function(req, res, next) {
  res.render('users/login', { title: 'Login' });
});

/* GET signup layout. */
router.route('/register')
  .get(function(req, res, next) {
    res.render('users/register', { title: 'Cadastro' });
  })
  .post(function(req, res, next) {
      // TODO: Adicionar outras validações
      req.checkBody("name", "Name cannot be empty").notEmpty();
      req.checkBody("email", "Please, use a valid email").isEmail();
      req.checkBody("password", "Password cannot be empty").notEmpty();
    
      var errors = req.validationErrors();
      if (errors)
        return res.status(400).send(errors);
    
    
      // Cria o objeto usuário para ser salvo
      var user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })
    
      // Busca no banco pelo usuário a partir do email dele
      User.findOne({ email: user.email }, function (err, searchedUser) {
        if (err)
          return res.send(err);
    
        // Verifica se nanhum usuário foi encontrado, ou seja o email é unico
        if (!searchedUser) {
          // Salva o usuário e retorna erros
          user.save(function (err) {
            if (err)
              return res.send(err);
    
            res.status(201).json([{ msg: 'User registered', data: user }]);
          });
          // Caso o email não seja unico, 
        } else {
          res.status(400).json([{ msg: 'Email alredy in use.' }])
        }
      })
    
    });

module.exports = router;
