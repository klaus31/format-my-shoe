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
  this.getScoreAllTimeBest = function() {
    return score.calculatePoints(data.msBest, data.topTime || 20000);
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
      if (wonAtAnyTime) {
        let msNeededCurrent = score.msNeeded(startTime, endTime);
        if (!data.msBest || data.msBest > msNeededCurrent) {
          data.msBest = msNeededCurrent;
        }
      }
      localStorage.setItem('level-' + config.name, JSON.stringify(data));
      // FIXME auskommentieren: Das ist Code, um eigene Bestleistungen besser zu warten
      newConfigs = newConfigs || JSON.parse(JSON.stringify(LEVEL_CONFIG));
      let i = newConfigs.length;
      while (i--) {
        if (newConfigs[i].name == config.name && !newConfigs[i].topTime) newConfigs[i].topTime = score.msNeeded(startTime, endTime);
      }
      console.info(JSON.stringify(newConfigs));
    }
    // FIXME auskommentieren: Das ist Code, um eigene Bestleistungen besser zu warten
  let newConfigs = JSON.parse(JSON.stringify(LEVEL_CONFIG));
};