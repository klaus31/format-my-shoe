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
  var up = {
   "firstgid":5,
   "image":"direction-up.png",
   "imageheight":16,
   "imagewidth":16,
   "margin":0,
   "name":"direction-up",
   "properties":{},
   "spacing":0,
   "tilecount":1,
   "tileheight":16,
   "tilewidth":16
  };
  var right = {
   "firstgid":6,
   "image":"direction-right.png",
   "imageheight":16,
   "imagewidth":16,
   "margin":0,
   "name":"direction-right",
   "properties":{},
   "spacing":0,
   "tilecount":1,
   "tileheight":16,
   "tilewidth":16
  };
  var down = {
   "firstgid":7,
   "image":"direction-down.png",
   "imageheight":16,
   "imagewidth":16,
   "margin":0,
   "name":"direction-down",
   "properties":{},
   "spacing":0,
   "tilecount":1,
   "tileheight":16,
   "tilewidth":16
  };
  var left = {
   "firstgid":8,
   "image":"direction-left.png",
   "imageheight":16,
   "imagewidth":16,
   "margin":0,
   "name":"direction-left",
   "properties":{},
   "spacing":0,
   "tilecount":1,
   "tileheight":16,
   "tilewidth":16
  };
  level.tilesets.push(up);
  level.tilesets.push(right);
  level.tilesets.push(down);
  level.tilesets.push(left);
});
