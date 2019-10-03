var app = require('express')();
var express = require('express');
var http = require("http").Server(app)
var port = process.env.PORT || 8000;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Item = require('./item')

var url = "mongodb://localhost:27017/shop";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.put('/item/create', function (req, res) {
        let test =  new Item(req.body)
       
        test.save(function(err,data){
            if(err){
                console.log('err')
            }else{
                console.log('saved')
            }
            Item.find(req.body ,function(err,item){
                if(err){
                    console.log('err')
                }else{
                   console.log(item);
                   res.json(item)
                }
    
            })

        })
})

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/view/index.html");
})



app.get('/item/retrieve/all', function (req, res) {
    
    let test =  new Item(req.body)
       
    test.save(function(err,data){
        if(err){
            console.log('err')
        }else{
            console.log('saved')
        }
        Item.find(req.body ,function(err,item){
            if(err){
                console.log('err')
            }else{
               console.log(item);
               res.json(item)
            }

        })

    })
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