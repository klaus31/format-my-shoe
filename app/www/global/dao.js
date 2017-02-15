const Dao = function() {
  let currentLevel = 0;
  let levels = [{
    name: 'intro-very-first',
    hasSpeed: false,
    hasPause: false
  }, {
    name: 'intro-health-heart',
    hasSpeed: false,
    hasPause: false
  }, {
    name: 'small-labyrinth',
    hasSpeed: false,
    hasPause: false
  }, {
    name: 'long-ways-to-go',
    hasSpeed: false,
    hasPause: false,
    heroSpeed: 300
  }, {
    name: 'intro-pause'
  }, {
    name: 'intro-speed'
  }, {
    name: 'slow-and-accurate',
    heroSpeed: 5
  }, {
    name: 'rain'
  }  ];
  this.getCurrentLevelInfo = function() {return new LevelInfo(levels[currentLevel], currentLevel + 1);}
  this.incrementCurrentLevel = function() {currentLevel++;}
  this.isCurrentLevelLastLevel = function(){return currentLevel == levels.length - 1;}
};
