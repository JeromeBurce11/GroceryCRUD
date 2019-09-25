var express = require('express')
var app = express()
var fs = require('fs')
var numReq = require('./NumReq')
app.set('view engine', 'pug');
app.set('views', 'view');
var path = require('path');
var readJSON = require('./readJSON');
var updateJSON = require('./updateJSON');

// respond the index.pug when a GET request is made to the homepage



app.get('/', function (req, res) {

    res.render('index');

})
app.get("/rate", function (req, res) {
    var rate = req.query.rate;
    var city = req.query.city+".json";
    var newData = readJSON.readJSON(city);
    var rating = (Number(newData.rate) + Number(rate))
    newData.rate = rating
    newData.rate = Number(Number(newData.rate/2).toFixed(2))
    updateJSON.updateJSON(city,newData)
    res.end(""+newData.rate)
})
app.use(function (req, res, next) {
    numReq.numRequest(req, res);
    next();
})

app.use(express.static(path.join(__dirname, '/public')));

app.get('/provinces/:name', function (req, res) {
    var provinceName = req.params.name + ".json";
    console.log(provinceName) //pathname like bohol.json
    var allData =readJSON.readJSON(provinceName);
    console.log(allData)
    res.render('index', allData)
})

app.listen(8000);