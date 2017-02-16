const Dao = function() {
  let currentLevel = 0;
  this.getCurrentLevelInfo = function() {return new LevelInfo(levels[currentLevel], currentLevel + 1);}
  this.incrementCurrentLevel = function() {currentLevel++;}
  this.isCurrentLevelLastLevel = function(){return currentLevel == levels.length - 1;}
};
