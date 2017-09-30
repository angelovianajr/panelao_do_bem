var mongoose = require('mongoose');

// Criação do schema
var eventSchema = new mongoose.Schema({
    title: String,
    location: {
        type: { type: String, default: "Point" },
        coordinates: [Number]
    },
    recipe: [{
        name: { type: String },
        feeded_qtd: { type: Number },
        ingredients: [{
            product: { mongoose.Schema.Types.ObjectId },
            qtd: { type: Number, default: 1}
        }],
        offers: [mongoose.Schema.Types.ObjectId]
    }],
});
