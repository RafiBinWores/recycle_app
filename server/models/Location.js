const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This fild is required.'
    }

});

module.exports = mongoose.model('Location', locationSchema);