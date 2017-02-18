let Drive = function() {

  let x, y, speed, firstMoveMade;

  this.stop = function() {
    x = 0;
    y = 0;
  }

  this.firstMoveMade = function() {
    return firstMoveMade;
  }
  this.getX = function() {
    return x;
  }
  this.getY = function() {
    return y;
  }
  this.setDrive = function(newX, newY) {
    x = newX;
    y = newY;
  }
}