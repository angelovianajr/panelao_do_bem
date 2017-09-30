var mongoose = require('mongoose');

// Criação do schema do motorista
var driverSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    status: { type: Boolean, default: true },
    city: { type: String },
    cell: { type: String }
});

// Cria um model com o schema par ao uso
var Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;