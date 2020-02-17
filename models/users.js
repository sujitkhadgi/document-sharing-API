const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },

    user_id:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: false
    }

}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);