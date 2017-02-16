const LevelInfo = function(info, number) {
  this.getNumber = function() {
    return number;
  }
  this.getName = function() {
    return info.name;
  }
  this.getHeroSpeed = function() {
    return info.heroSpeed || 200;
  }
  this.hasPause = function() {
    return info.hasPause !== false;
  }
  this.hasSpeed = function() {
    return info.hasPause !== false;
  }
};