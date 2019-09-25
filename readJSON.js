var fs = require("fs")
exports.readJSON = function (provinceName) {
    var myData = fs.readFileSync("./provinces/"+provinceName);
    return JSON.parse(myData);
}