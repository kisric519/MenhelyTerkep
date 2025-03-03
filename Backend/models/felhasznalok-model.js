const mongoose = require('mongoose');

const FelhasznalokScheme = mongoose.Schema({
    nev:{
        type: String,
        default: "",
        required: true
    },
    email:{
        type: String,
        default: "",
        required: true
    },
    telefonszam:{
        type: String,
        default: "",
        required: true
    },
    jelszo:{
        type: String,
        default: "",
        required: true
    },
    kedvencek: { type: [String], default: [] }
});

module.exports = mongoose.model('Felhasznalok', FelhasznalokScheme);