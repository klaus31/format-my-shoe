#!/usr/bin/node

var fs = require('fs');

var withEachLevel = function(func, andAfterAll) {
  var basedir = __dirname + '/../www/game/levels';
  fs.readdir(basedir, (err, files) => {
    var filesRemain = files.length;
    files.forEach(file => {
      if(file.match('\.json$')) {
        var levelfile = basedir + '/' + file;
        fs.readFile(levelfile, 'utf8', function (err, data) {
          if (err) throw err;
          var level = JSON.parse(data);
          func(file, level);
          if(!--filesRemain) {
            andAfterAll();
          }
        });
      } else {
        --filesRemain;
      }
    });
  });
}

var collectData = function(file, level) {
  var props = level.properties;
  props.filename = file;
  levelConfigs.push(props);
}

var outputData = function() {
  var LEVEL_CONFIG_FILE =  __dirname + '/../www/global/level-config.js';
  // TODO order it!!
  fs.writeFile(LEVEL_CONFIG_FILE, 'const LEVEL_CONFIG = ' + JSON.stringify(levelConfigs)) + ';';
}

var levelConfigs = [];

withEachLevel(collectData, outputData);
