const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;

var url = "mongodb://localhost:27017/library";
mongoose.set('useCreateIndex', true);
mongoose.connect(url, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true })

var Item = new Schema({

    item: {
        type: String,
        require: true,
        unique: true
    },
    Volume:{
        type:String,
        require:true
    },
    Author: {
        type: String,
        require: true
        // unique: true
    },
    Quantity: {
        type: Number,
        require: true
    },

})
Item.plugin(uniqueValidator, { message: 'Error, expected ${item} to be unique.' });
module.exports = mongoose.model('Item', Item);