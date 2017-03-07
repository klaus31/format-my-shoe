var express = require('express');
var app = express();
var port = 8081;

app.use(express.static(__dirname + '/www/.'));
//app.use(express.static(__dirname + '/node_modules/.'));


app.listen(port, function() {
  console.info('please visit: http://localhost:' + port);
});
