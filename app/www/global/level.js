const Level = function(config, index) {
  const ME = this;
  let played = false;
  let won;
  let data = JSON.parse(localStorage.getItem('level-' + config.name));
  let wonAtAnyTime = data && data.wonAtAnyTime;
  let startTime;
  let endTime;
  this.getIndex = function() {
    return index;
  }
  this.getNumber = function() {
    return index + 1;
  }
  this.getName = function() {
    return config.name;
  }
  this.getHeroSpeed = function() {
    return config.heroSpeed || 200;
  }
  this.start = function() {
    startTime = new Date();
  }
  this.end = function() {
    endTime = new Date();
  }
  this.createScoreCurrent = function() {
    return new Score(startTime, endTime);
  }
  this.getScoreAllTimeBest = function() {
    return data.scoreAllTimeBest;
  }
  this.getStartingPosition = function() {
    config.startingPosition = config.startingPosition || {};
    return {
      x: 16 * (config.startingPosition.x || 2),
      y: 16 * (config.startingPosition.y || 2)
    }
  }
  this.getStartAngle = function() {
    return config.startAngle || 0;
  }
  this.hasPause = function() {
    return config.hasPause !== false;
  }
  this.hasSpeed = function() {
    return config.hasPause !== false;
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
    let isNewHighscore = !data.scoreAllTimeBest || ME.createScoreCurrent().calculatePoints() > data.scoreAllTimeBest;
    if (isNewHighscore) data.scoreAllTimeBest = ME.createScoreCurrent().calculatePoints();
    localStorage.setItem('level-' + config.name, JSON.stringify(data));
  }
};