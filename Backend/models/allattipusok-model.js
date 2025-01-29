const mongoose = require('mongoose');

const AllattipusokScheme = mongoose.Schema({
    megnevezes:{
        type: String,
        default: "",
        required: true
    }
});

module.exports = mongoose.model('Allattipusok',AllattipusokScheme);