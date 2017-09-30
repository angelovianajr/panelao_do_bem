var mongoose = require('mongoose');

// Criação do schema
var offerSchema = new mongoose.Schema({
    title: String,
    product: { type: mongoose.Schema.Types.ObjectId },
    price: { type: Number },
    qtd: { type: Number },
    location: {
        type: { type: String, default: "Point" },
        coordinates: [Number]
    },
});

// Cria um model com o schema par ao uso
var Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;