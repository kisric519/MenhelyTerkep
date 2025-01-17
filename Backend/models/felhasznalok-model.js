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
    }
});

module.exports = mongoose.model('Felhasznalok', FelhasznalokScheme);