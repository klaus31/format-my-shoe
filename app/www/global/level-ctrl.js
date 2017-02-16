const LevelCtrl = function() {

  const ME = this;
  let currentLevel;
  let i = 0;
  const levels = [];
  while (i < LEVEL_CONFIG.length) {
    levels[i] = new Level(LEVEL_CONFIG[i], i);
    i++;
  }
  currentLevel = levels[0];

  this.getCurrentLevel = function() {
    return currentLevel;
  }
  this.setCurrentLevelIndex = function(index) {
    currentLevel = levels[index];
  }
  this.getLevelCount = function() {
    return LEVEL_CONFIG.length;
  }
  this.isCurrentLevelLastLevel = function() {
    return currentLevel.getIndex() == ME.getLevelCount() - 1;
  }
};