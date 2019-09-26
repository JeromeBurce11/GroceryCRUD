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
    console.log(rate)
    var city = req.query.city+".json";
    console.log(city)
    var newData = readJSON.readJSON(city);
    var rating = (Number(newData.rate) + Number(rate))
    newData.rate = rating
    newData.rate = Number(Number(newData.rate/2).toFixed(2))// the oldData is updated
    updateJSON.updateJSON(city,newData)//module in updating the datas
    res.end(""+newData.rate)//convert to
    console.log(newData.rate)
    numReq.numRequest(req, res);
})

app.get('/provinces/:name', function (req, res) {
    var provinceName = req.params.name + ".json";
   // console.log(provinceName) //determing the file like bohol.json
    var allData =readJSON.readJSON(provinceName);//module for reading all the data
   // console.log(allData)
    res.render('index', allData)
    numReq.numRequest(req, res);//module for NumReq
})
app.all("*", function (req, res, next) {
    
    numReq.numRequest(req, res);//module for NumReq
    next();
})


app.use(express.static(path.join(__dirname, '/public/')));

app.listen(8000);