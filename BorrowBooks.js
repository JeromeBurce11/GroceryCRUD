const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;


var BorrowBooks = new Schema({
    Borrower: {
        type: String,
        required: true,
        unique:true
    },

    BookID: {
        type: Object,
        required:true
    },

    Quantity: {
        type: Number,
        required:true
    }

});

BorrowBooks.plugin(uniqueValidator, { message: 'Error, expected ${item} to be unique.' });
module.exports = mongoose.model('BorrowBook', BorrowBooks);