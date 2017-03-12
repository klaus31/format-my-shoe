const LevelCtrl = function() {

  const ME = this;
  let currentLevel;
  let i = LEVEL_CONFIG.length;
  const levels = [];
  i = 0;
  while (i < LEVEL_CONFIG.length) {
    levels[i] = new Level(LEVEL_CONFIG[i], i);
    if (debugMode) console.info((i + 1) + ' ' + LEVEL_CONFIG[i].name);
    i++;
  }
  i = 0;
  while (i < LEVEL_CONFIG.length - 1 && levels[i].isWonAtAnyTime()) {
    i++;
  }
  currentLevel = levels[i];
  let timeout = false;

  this.reset = function() {
    timeout = false;
  }
  this.getCurrentLevel = function() {
    return currentLevel;
  }
  this.getLevel = function(index) {
    return levels[index];
  }
  this.setCurrentLevelIndex = function(index) {
    currentLevel = levels[index];
  }
  this.isPlayable = function(level) {
    let index = levels.indexOf(level);
    return index == 0 || level.isWonAtAnyTime() || levels[index - 1].isWonAtAnyTime();
  }
  this.setCurrentLevelPlayed = function() {
    currentLevel.setPlayed();
  }
  this.setCurrentLevelWon = function(won) {
    currentLevel.setWon(won);
  }
  this.getLevelCount = function() {
    return LEVEL_CONFIG.length;
  }
  this.isCurrentLevelLastLevel = function() {
    return currentLevel.getIndex() == ME.getLevelCount() - 1;
  }
  this.isTimeout = function() {
    return timeout;
  }
  this.setGotTimeout = function() {
    timeout = true;
  }
};