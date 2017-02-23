let Drive = function(maxSpeed) {

  const ME = this;
  let x;
  let y;
  let firstMoveMade = false;
  let prevX = false;
  let currentSpeed = 1;

  this.stop = function() {
    x = 0;
    y = 0;
    currentSpeed = 1;
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
        currentSpeed = maxSpeed - 10 > currentSpeed ? currentSpeed * 1.12 : maxSpeed;
        x = currentSpeed * Math.cos(sprite.angle * Math.PI / 180);
        y = currentSpeed * Math.sin(sprite.angle * Math.PI / 180);
      }
      prevX = game.input.x;

      console.info('a: ' + currentSpeed)
    }
    if (game.input.activePointer.isUp) {
      prevX = false;
      currentSpeed = currentSpeed <= 1 ? 1 : currentSpeed * 0.9;
      console.info('b: ' + currentSpeed)
      x = currentSpeed * Math.cos(sprite.angle * Math.PI / 180);
      y = currentSpeed * Math.sin(sprite.angle * Math.PI / 180);
    }
  }
}
