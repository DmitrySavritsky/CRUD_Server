const mongoose = require('mongoose');
const referrenceValidator = require('mongoose-referrence-validator');

const photoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    filepath:{
        type: String,
        required: true,
    },
    user_id: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

photoSchema.plugin(referrenceValidator);

module.exports =  mongoose.model('Photo',photoSchema);