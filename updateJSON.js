var fs = require("fs")
exports.updateJSON = function(provinceName , newData){
    fs.writeFile("./provinces/"+provinceName, JSON.stringify(newData), function (err) {
        if (err) throw err;
        console.log('Replaced!');
      });
}