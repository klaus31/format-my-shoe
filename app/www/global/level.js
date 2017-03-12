const Level = function(config, index) {
  const ME = this;
  let played = false;
  let won;
  let data = JSON.parse(localStorage.getItem('level-' + config.name));
  let wonAtAnyTime = data && data.wonAtAnyTime;
  let startTime;
  let endTime;
  let isStarted = false;
  let score = new Score();
  this.getIndex = function() {
    return index;
  }
  this.getStopsOptimal = function() {
    return config.stopsOptimal;
  }
  this.getStopsGood = function() {
    return config.stopsGood;
  }
  this.getNumber = function() {
    return index + 1;
  }
  this.isStarted = function() {
    return isStarted;
  }
  this.getName = function() {
    return config.name;
  }
  this.getFilename = function() {
    return config.filename;
  }
  this.start = function() {
    if (debugMode) {
      console.info('starting: ' + config.filename);
    }
    startTime = new Date();
    endTime = false;
    isStarted = true;
  }
  this.end = function() {
    endTime = new Date();
    isStarted = false;
  }
  this.getScoreAllTimeBest = function() {
    return score.calculatePoints(ME, data.stopsMadeBest);
  }
  this.getDifficulty = function() {
    return config.difficulty || NORMAL;
  }
  this.getStartingPosition = function() {
    config.startingPosition = config.startingPosition || {};
    return {
      x: 16 * (config.startX || 2) + 8,
      y: 16 * (config.startY || 4) + 8
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
  this.persist = function(stopsMade) {
    data = data || {};
    data.wonAtAnyTime = wonAtAnyTime;
    if (wonAtAnyTime) {
      let msNeededCurrent = score.msNeeded(startTime, endTime);
      if (!data.msBest || data.msBest > msNeededCurrent) {
        data.msBest = msNeededCurrent;
      }
      if (!data.stopsMadeBest || data.stopsMadeBest > stopsMade) {
        data.stopsMadeBest = stopsMade;
      }
    }
    localStorage.setItem('level-' + config.name, JSON.stringify(data));
    if (debugMode) {
      console.info('stopsMade: ' + stopsMade)
    }
  }
};
