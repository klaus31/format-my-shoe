let Direction = function() {

  let currentDirection = 's';

  this.setDirection = function(lruds) {
    currentDirection = lruds;
  }

  this.goLeft = function() {
    return currentDirection === 'l';
  }
  this.goRight = function() {
    return currentDirection === 'r';
  }
  this.goUp = function() {
    return currentDirection === 'u';
  }
  this.goDown = function() {
    return currentDirection === 'd';
  }
  this.stop = function() {
    return currentDirection === 's';
  }
}