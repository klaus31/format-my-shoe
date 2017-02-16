const Level = function(config, index) {
  let played = false;
  let won;
  let wonAtAnyTime;
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
};