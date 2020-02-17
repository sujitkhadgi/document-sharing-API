const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Notice', noticeSchema);