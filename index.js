var app = require('express')();
var express = require('express');
var http = require("http").Server(app)
var port = process.env.PORT || 8000;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Item = require('./item')
var a;
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())
app.use(express.static('view'));
app.use(express.static('public'));
app.set('view engine', 'ejs');


app.put('/item/create', function (req, res) {
    let test = new Item(req.body)
    console.log(req.body);
    test.save(function (err, data) {
        if (err) {

            console.log(err)
        } else {
            console.log(data + 'saved')
        }
        Item.find(req.body, function (err, item) {
            if (err) {
                console.log('err')
            } else {
                res.json(item)
            }
        })
    })
})

app.put('/item/borrowbooks', function (req, res) {
    let test = new Item(req.body)
    console.log(req.body);
    test.save(function (err, data) {
        if (err) {
            console.log(err)
        } else {
            console.log(data + 'saved')
        }
        Item.find(req.body, function (err, item) {
            if (err) {
                console.log('err')
            } else {
                res.json(item)
            }
        })
    })
})


app.get('/', function (req, res) {
    res.sendFile(__dirname + "/view/index.html");
})

app.get('/item/retrieve/all', function (req, res) {
    Item.find(req.body, function (err, item) {
        if (err) {
            console.log('err')
        } else {
            res.json(item)
        }
    })
})
app.all('/items/search', function(req, res) {
    Item.find(req.body, function (err, item) {
        if (err) {
            console.log('err')
        } else {
            res.send(item)
            console.log(item)
        }
    })
 });

app.get('/item/retrieve/:id', function (req, res) {
    Item.findById({ _id: req.params.id })
        .then(items => {
            if (!items) {
                return res.status(404).send({
                    message: "items not found with id " + req.params.id
                });
            }
            res.send(items);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "items not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving items with id " + req.params.id
            });
        });
})
app.put('/item/update1/:id', function (req, res) {
    console.log(a);
    Item.findOneAndUpdate({ _id: req.body.id }, { borrowQuantity: a- req.body.borrowQuantity }, {
        new: true,
        upsert: true
    })

        .then(items1 => {
            if (!items1) {
                return res.status(404).send({
                    message: "items not found with id " + req.params.id
                });
            }
            // console.log(items1)
            res.json(items1);
            // console.log(items)
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "items not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving items with id " + req.params.id
            });
        });
})

app.put('/item/update/:id', function (req, res) {
    a= req.body.Quantity;
    Item.findOneAndUpdate({ _id: req.body.id }, { item: req.body.item, Author: req.body.Author, Quantity: req.body.Quantity }, {
        new: true,
        upsert: true
    })

        .then(items => {
            if (!items) {
                return res.status(404).send({
                    message: "items not found with id " + req.params.id
                });
            }
            res.json(items);
            // console.log(items)
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "items not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving items with id " + req.params.id
            });
        });
})

app.delete('/item/delete', function (req, res) {
    console.log(req.body);
    Item.findOneAndDelete({ _id: req.body.id }, function (err, data) {
        if (err) return console.log(err);
        const response = {
            message: "Successfully deleted",
        };
        return res.status(200).send(response);
    })
})

http.listen(port, function () {
    console.log('listening on *:' + port);
});