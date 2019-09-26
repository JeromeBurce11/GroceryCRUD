var numberOfRequest = 0;
var fs = require('fs')
exports.numRequest = function (req, res) {
    ++numberOfRequest;//convert into integer
    fs.writeFile("requestfile.txt", numberOfRequest, function (err, ) {//replacing the files into new one.

        if (err) {
            err.sendStatus(404);
        }

    });
    console.log(numberOfRequest);
    
}