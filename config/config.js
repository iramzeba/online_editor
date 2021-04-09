var mongoose = require('mongoose');
var url = "mongodb://localhost:27017/users";

mongoose.connect(url, function(err, db){
if (err) throw err;
console.log("database connected")
})

module.exports =mongoose;