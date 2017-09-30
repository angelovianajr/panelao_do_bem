var mongoose = require('mongoose');

// Criação do schema
var productSchema = new mongoose.Schema({
    title: String
});

// Cria um model com o schema par ao uso
var product = mongoose.model('Product', productSchema);

module.exports = Product;