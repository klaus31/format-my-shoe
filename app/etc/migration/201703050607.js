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
          func(file, level);
          fs.writeFile(levelfile, JSON.stringify(level));
        });
      }
    });
  })
}

withEachLevel(function(file, level) {
  var VERY_HARD = 1000;
  var HARD = 800;
  var QUIET_HARD = 600;
  var NORMAL = 400;
  var QUIET_EASY = 200;
  var EASY = 100;
  var VERY_EASY = 0;
  var existingLevels = [{
    name: 'intro-goal',
    topTime: 951,
    startDirection: 'right',
    difficulty: VERY_EASY
  }, {
    name: 'intro-deadwall',
    topTime: 951,
    startDirection: 'right',
    difficulty: VERY_EASY
  }, {
    name: 'intro-health',
    topTime: 10603,
    startDirection: 'up',
    startingPosition: {
      x: 25,
      y: 47
    },
    difficulty: VERY_EASY
  }, {
    name: 'intro-direction-change',
    topTime: 22792,
    startDirection: 'up',
    startingPosition: {
      x: 25,
      y: 47
    },
    difficulty: VERY_EASY
  }, {
    name: 'intro-health-heart',
    topTime: 17492,
    difficulty: VERY_EASY
  }, {
    name: 'small-labyrinth',
    topTime: 38431,
    difficulty: QUIET_EASY
  }, {
    name: 'rain',
    topTime: 11454,
    difficulty: VERY_HARD
  }, {
    name: 'long-ways-to-go',
    topTime: 18177,
    heroSpeed: 300,
    difficulty: NORMAL
  }, {
    name: 'lotta-5',
    topTime: 34583,
    startingPosition: {
      x: 13,
      y: 15
    },
    startDirection: 'down',
    difficulty: NORMAL
  }, {
    name: 'labyrinth-50x50-circles',
    topTime: 12123,
    difficulty: QUIET_HARD
  }, {
    name: 'labyrinth-12x12-1',
    topTime: 8912,
    difficulty: QUIET_EASY
  }, {
    name: 'labyrinth-12x12-2',
    topTime: 6488,
    startingPosition: {
      x: 1,
      y: 2
    },
    difficulty: QUIET_EASY
  }, {
    name: 'labyrinth-12x12-3',
    topTime: 16891,
    difficulty: QUIET_EASY
  }, {
    name: 'labyrinth-12x12-4',
    topTime: 8511,
    difficulty: QUIET_EASY
  }, {
    name: 'labyrinth-12x12-5',
    topTime: 7458,
    difficulty: QUIET_EASY
  }, {
    name: 'labyrinth-12x12-6',
    topTime: 6287,
    difficulty: QUIET_EASY
  }, {
    name: 'lotta-4',
    topTime: 11588,
    startingPosition: {
      x: 1,
      y: 1
    },
    difficulty: NORMAL
  }, {
    name: 'lotta-3',
    topTime: 36270,
    difficulty: NORMAL
  }, {
    name: 'lotta-1',
    topTime: 23981,
    difficulty: VERY_HARD
  }, {
    name: 'klaus-1',
    topTime: 24215,
    difficulty: VERY_HARD
  }, {
    name: 'klaus-2',
    topTime: 17643,
    difficulty: HARD
  }, {
    name: 'lotta-2',
    topTime: 16486,
    difficulty: EASY
  }, {
    name: 'snake-feb',
    topTime: 24333,
    difficulty: QUIET_HARD,
    startingPosition: {
      x: 1,
      y: 1
    }
  }, {
    name: 'tiles-shifted-29x197-2',
    topTime: 82133,
    difficulty: QUIET_HARD
  }, {
    name: 'tiles-shifted-29x197-1',
    topTime: 102461,
    difficulty: HARD
  }, {
    name: 'tiles-29x197-2',
    topTime: 45772,
    difficulty: VERY_HARD
  }, {
    name: 'tiles-29x197-1',
    topTime: 66925,
    difficulty: QUIET_HARD
  }];

  var i = existingLevels.length;
  while(i--) {
    if(existingLevels[i].name + '.json' == file) {
      var props = existingLevels[i];
      if(props.startingPosition) {
        props.startX = props.startingPosition.x || 2;
        props.startY = props.startingPosition.y || 2;
         delete props.startingPosition;
      }
      level.properties = props;
    }
  }
});
