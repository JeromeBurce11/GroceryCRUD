var express = require('express')
var app = express()
var fs = require('fs')
app.set('view engine', 'pug');
app.set('views', 'view');
var path = require('path');
app.use(express.static(path.join(__dirname,'/public')));
// respond the index.pug when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.render('index');
})
app.get('/provinces/:name', function (req, res) {
    var provinceName = req.params.name + ".json";
    console.log(provinceName) //pathname like bohol.json

    fs.readFile("./provinces/"+provinceName, function(err, data) {    
        console.log(data);
        console.log(JSON.parse(data));
         var alldata= JSON.parse(data);
        res.render('index',{image1:alldata.images[0],image2:alldata.images[1],image3:alldata.images[2], alldata: alldata } )//display data in the index
        
        if(err){
        res.sendStatus(404);
        }
    
      });
})
app.listen(8000);