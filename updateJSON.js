var fs = require("fs")
exports.updateJSON = function(provinceName , newData){
    fs.writeFile("./provinces/"+provinceName, JSON.stringify(newData), function (err) {// the updated data or the new data.
        //ang json na file kay mabago
        if (err) throw err;
        console.log('Replaced!');
      });
}