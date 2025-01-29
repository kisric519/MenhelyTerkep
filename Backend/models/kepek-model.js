const mongoose = require('mongoose');

const KepekScheme = mongoose.Schema({
    menhelyId:{
        type: String,
        default: "",
        required: true
    },
    kepurl:{
        type: String,
        default: "",
        required: true
    }
});

module.exports = mongoose.model('Kepek',KepekScheme);