const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;


var BorrowBooks = new Schema({
    Borrower: {
        type: String,
        required,
        unique
    },

    item: {
        type: Number,
        required
    },

    Date: {
        type: String,
        required,
    }

});

BorrowBooks.plugin(uniqueValidator, { message: 'Error, expected ${item} to be unique.' });
module.exports = mongoose.model('BorrowBooks', BorrowBooks);