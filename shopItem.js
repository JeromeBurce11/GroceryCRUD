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
var Shop = mongoose.model('shop', shoppingSchema, 'item');