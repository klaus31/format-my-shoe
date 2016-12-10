var express = require('express');
var app = express();
var port = 8080;

app.use(express.static(__dirname + '/www/.'));

app.listen(port, function() {
  console.info('please visit: http://localhost:' + port);
});
