const mongoose = require('mongoose');

const menhelyekModel = mongoose.Schema({
    menhelyneve:{
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
    menhelycime:{
        type: String,
        default: "",
        required: true
    },
    oldal_link:{
        type: String,
        default: "",
        required: true
    },
    leiras:{
        type: String,
        default: "",
        required: true
    },
    jovahagyva:{
        type: Boolean,
        default: false,
        required: true
    },
});

module.exports = mongoose.model('Menhelyek', menhelyekModel);