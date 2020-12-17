const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    avatar:{
        type: String,
        required: true
    },
    photos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Photo' }]
});

module.exports = userSchema;