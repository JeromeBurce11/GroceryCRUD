var fs = require("fs")
exports.readJSON = function (provinceName) {
    var myData = fs.readFileSync("./provinces/"+provinceName);//reading the file in the pathname
    return JSON.parse(myData);//object na sya
}