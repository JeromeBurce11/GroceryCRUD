const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;


var BorrowHistory = new Schema({
    _id: {
        type: String,
        required: true,
    },
    Borrower: {
        type: String,
        required: true,

    },

    BookID: {
        type: Object,
        required: true
    },

    Quantity: {
        type: Number,
        required: true
    },

    book: {
        type: String,
        required: true
    }

});

BorrowHistory.plugin(uniqueValidator, {
    message: 'Error, expected ${item} to be unique.'
});
module.exports = mongoose.model('BorrowHistory', BorrowHistory);