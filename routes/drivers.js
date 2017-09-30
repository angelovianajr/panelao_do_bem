
var express = require('express');
var router = express.Router();
var Driver = require('../models/driver');

/* GET register drivers */
router.get('/register', function(req, res, next) {
    res.render('drivers/index', { Title: 'Regitro de Motorista'})
})

/* GET POST available drivers. */
router.route('/')
    .get( function(req, res, next) {
        Driver.find(function(err, driver) {
            if(driver.length) {
                res.status(200).json(driver);                    
            } else {
                res.status(404).json({ message: 'Nenhum motorista encontrado.' });
            }
        })
    })
    .post(function(req, res, next) {
        var driver = new Driver({
            name: req.body.name,
            email: req.body.email,
            status: req.body.status,
            city: req.body.city,
            cell: req.body.cell
        });

        driver.save(function(err) {
            if(err) {
                res.status(400).json({ message: err });
            } else {
                res.status(201).json({ message: 'Sucesso no cadastro de motorista.' });
            }
        })
    });

module.exports = router;
    