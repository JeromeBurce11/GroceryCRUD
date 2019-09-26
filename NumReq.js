exports.numRequest = function (req, res) {
    var fs = require('fs')
    fs.readFile("requestfile.txt", function (err,data) {// make a file and add per request
        if(err){
            return("error found!");
        }
        var numberOfRequest = (data * 1)+1;//convert into integer
        fs.writeFile("requestfile.txt", numberOfRequest, function (err,) {//replacing the files into new one.
            
            if (err) {
                err.sendStatus(404);
            }

        });

    });
    
}