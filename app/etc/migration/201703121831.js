#!/usr/bin/node

var fs = require('fs');

var withEachLevel = function(func) {
  var basedir = __dirname + '/../../www/game/levels';
  fs.readdir(basedir, (err, files) => {
    files.forEach(file => {
      if(file.match('\.json$')) {
        var levelfile = basedir + '/' + file;
        fs.readFile(levelfile, 'utf8', function (err, data) {
          if (err) throw err;
          var level = JSON.parse(data);
          func(level);
          fs.writeFile(levelfile, JSON.stringify(level));
        });
      }
    });
  })
}

withEachLevel(function(level) {
  delete level.properties.heroSpeed;
});
