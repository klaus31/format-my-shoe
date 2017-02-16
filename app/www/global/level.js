const Level = function(config, index) {
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
};