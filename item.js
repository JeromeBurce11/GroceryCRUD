const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;

var Item = new Schema({
    item:{
        type: String,
        require: true,
        unique: true
    },
    Quantity:{
        type: Number,
        require: true
    },
    Priority:{
        type: Number,
        require: true
    }
})
Item.plugin(uniqueValidator, { message: 'Error, expected ${item} to be unique.' });

module.exports = mongoose.model('Item', Item);