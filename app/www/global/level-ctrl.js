const LevelCtrl = function() {

  this.sortByDifficulty = function(levelA, levelB) {
    if (levelA.getDifficulty() == levelB.getDifficulty()) {
      return 0;
    } else {
      return levelA.getDifficulty() < levelB.getDifficulty() ? -1 : 1;
    }
  }

  const ME = this;
  let currentLevel;
  let i = 0;
  const levels = [];
  while (i < LEVEL_CONFIG.length) {
    levels[i] = new Level(LEVEL_CONFIG[i], i);
    i++;
  }
  levels.sort(ME.sortByDifficulty);
  i = 0;
  while (i < LEVEL_CONFIG.length - 1 && levels[i].isWonAtAnyTime()) {
    i++;
  }
  currentLevel = levels[i];

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
};