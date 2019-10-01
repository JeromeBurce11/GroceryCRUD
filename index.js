var app = require('express')();
var express = require('express');
var http = require("http").Server(app)
var port = process.env.PORT || 1234;
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/shop', { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Yehey")
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

var item1 = new Shop({ item: 'Coke', quantity: 5, priority: 1 })
    item1.save(function (err, shop) {
        if (err) return console.error(err);
        console.log(shop.item + " saved to bookstore collection.");
    });

app.get('/', function (req, res) {
    res.sendFile(__dirname+"/index.html")
})

app.put('/item/create', function (req, res) {

    
    
})

app.get('/item/retrieve/all', function (req, res) {
    res.send('Retrieve all files here')
})

app.get('/item/retrieve/:id', function (req, res) {
    res.send("Result: " + req.params.id)
})

app.post('/item/update/', function (req, res) {
    res.send("File updated!")
})

app.delete('/item/delete', function (req, res) {
    res.send('Item delete!')
})

http.listen(port, function () {
    console.log('listening on *:' + port);
});