const mongoose = require('mongoose');

const AdminokScheme = mongoose.Schema({
    felhasznalonev:{
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

module.exports = mongoose.model('Adminok',AdminokScheme);