let Drive = function(speed) {

  const ME = this;
  const ANGLE_SNAP_INTO_PLACE = 10;
  let x;
  let y;
  let firstMoveMade = false;
  let prevX = false;

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
  this.update = function(sprite) {
    if (game.input.activePointer.isDown) {
      if(prevX) {
        firstMoveMade = true;
        let newAngle = sprite.angle + game.input.x - prevX;
        sprite.angle = newAngle;
        x = speed * Math.cos(sprite.angle * Math.PI / 180);
        y = speed * Math.sin(sprite.angle * Math.PI / 180);
      }
      prevX = game.input.x;
    }
    if (game.input.activePointer.isUp) {
      prevX = false;
    }
  }
}
