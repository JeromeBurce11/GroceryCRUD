
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;

var BorrowItem = new Schema({
    Borrower: {
        type: String,
        require: true
        // unique: true
    },
    item: {
        type: String,
        require: true,
        unique: true
    },
    Date: {
        type: String,
        require: true
    },
s
})
BorrowItem.plugin(uniqueValidator, { message: 'Error, expected ${item} to be unique.' });
module.exports = mongoose.model('Item',BorrowItem);