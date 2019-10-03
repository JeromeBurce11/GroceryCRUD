const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Item = new Schema({
    item:{
        type: String,
        require: true
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
module.exports = mongoose.model('Item', Item);