const Dao = function() {
  let currentLevel = 0;
  let levels = [{
    name: 'intro-very-first'
  }, {
    name: 'intro-health-heart'
  }, {
    name: 'small-labyrinth'
  }, {
    name: 'long-ways-to-go'
  }, {
    name: 'intro-pause'
  }, {
    name: 'intro-speed'
  }, {
    name: 'rain'
  }  ];
  this.getCurrentLevelInfo = function() {return new LevelInfo(levels[currentLevel], currentLevel + 1);}
  this.incrementCurrentLevel = function() {currentLevel++;}
  this.isCurrentLevelLastLevel = function(){return currentLevel == levels.length - 1;}
};
