const LevelCtrl = function() {

  this.sortByDifficulty = function(levelA, levelB) {
    if (levelA.difficulty == levelB.difficulty) {
      return levelA.name < levelB.name;
    } else {
      return levelA.difficulty < levelB.difficulty ? -1 : 1;
    }
  }

  const ME = this;
  let currentLevel;
  let i = LEVEL_CONFIG.length;
  const levelConfigs = LEVEL_CONFIG.sort(ME.sortByDifficulty);
  const levels = [];
  i = 0;
  while (i < levelConfigs.length) {
    levels[i] = new Level(levelConfigs[i], i);
    if (debugMode) console.info((i + 1) + ' ' + levelConfigs[i].name);
    i++;
  }
  i = 0;
  while (i < levelConfigs.length - 1 && levels[i].isWonAtAnyTime()) {
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