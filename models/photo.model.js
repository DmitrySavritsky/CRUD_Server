const mongoose = require('mongoose');

const photoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    filepath:{
        type: String,
        required: true,
    },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = photoSchema;