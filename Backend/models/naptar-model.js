const mongoose = require('mongoose');

const NaptarScheme = mongoose.Schema({
    menhelyId:{
        type: String,
        default: "",
        required: true
    },
    esemenyneve:{
        type: String,
        default: "",
        required: true
    },
    datum:{
        type: Date,
        default: Date.now,
        required: true
    },
    leiras:{
        type: String,
        default: "",
        required: true
    }
});

module.exports = mongoose.model('Naptar',NaptarScheme);