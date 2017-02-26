const Level = function(config, index) {
  const ME = this;
  let played = false;
  let won;
  let data = JSON.parse(localStorage.getItem('level-' + config.name));
  let wonAtAnyTime = data && data.wonAtAnyTime;
  let startTime;
  let endTime;
  let score = new Score();
  this.getIndex = function() {
    return index;
  }
  this.getNumber = function() {
    return index + 1;
  }
  this.isStarted = function() {
    return !!startTime;
  }
  this.getName = function() {
    return config.name;
  }
  this.getHeroSpeed = function() {
    return config.heroSpeed || 200;
  }
  this.start = function() {
    if (debugMode) {
      console.info('starting: ' + config.name);
    }
    startTime = new Date();
  }
  this.end = function() {
    endTime = new Date();
  }
  this.getScoreAllTimeBest = function() {
    return score.calculatePoints(data.msBest, data.topTime || 20000);
  }
  this.getDifficulty = function() {
    return config.difficulty || NORMAL;
  }
  this.getStartingPosition = function() {
    config.startingPosition = config.startingPosition || {};
    return {
      x: 16 * (config.startingPosition.x || 2) + 8,
      y: 16 * (config.startingPosition.y || 2) + 8
    }
  }
  this.getStartAngle = function() {
    if (config.startDirection) {
      switch (config.startDirection) {
        case 'up':
          return -90;
        case 'right':
          return 0;
        case 'down':
          return 90;
        case 'left':
          return 180;
        default:
          throw 'invalid direction ' + config.startDirection;
      }
    }
    return 0;
  }
  this.setPlayed = function() {
    played = true;
  }
  this.isPlayed = function() {
    return played;
  }
  this.setWon = function(value) {
    won = value;
    if (value) wonAtAnyTime = true;
  }
  this.isWon = function() {
    return won;
  }
  this.isWonAtAnyTime = function() {
    return wonAtAnyTime;
  }
  this.persist = function() {
    data = data || {};
    data.wonAtAnyTime = wonAtAnyTime;
    if (wonAtAnyTime) {
      let msNeededCurrent = score.msNeeded(startTime, endTime);
      if (!data.msBest || data.msBest > msNeededCurrent) {
        data.msBest = msNeededCurrent;
      }
    }
    localStorage.setItem('level-' + config.name, JSON.stringify(data));
    if (debugMode) {
      console.info('topTime: ' + score.msNeeded(startTime, endTime))
    }
  }
};
