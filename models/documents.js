const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },

    sem:{
        type: String,
        required: true
    },

    file:{
        type: String,
        required: true
    }

}, {timestamps: true});

module.exports = mongoose.model('Documents', documentSchema);