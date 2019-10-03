
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Successfully added!")
});

var shoppingSchema = new mongoose.Schema({
    item: {
        type: String
    },

    quantity: {
        type: Number,
    },

    priority: {
        type: String
    }

});

var Shop = mongoose.model('Shop', shoppingSchema, 'item');

module.exports =item;