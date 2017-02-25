let Drive = function(maxSpeed, maxBackwardSpeed) {

  const ME = this;
  let x;
  let y;
  let firstMoveMade = false;
  let prevX = false;
  let prevY = false;
  let currentSpeed = 1;
  maxBackwardSpeed = maxBackwardSpeed || -20;

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

  let updateCurrentSpeed = function() {
    if (game.input.activePointer.isDown) {
      if (prevY) {
        let newCurrentSpeed = currentSpeed + prevY - game.input.y;
        if (maxSpeed < newCurrentSpeed) {
          // correct prevY, for being with the finger maximal on max speed (and not over)
          prevY = game.input.y - (maxSpeed - newCurrentSpeed);
          newCurrentSpeed = maxSpeed;
        }
        if (newCurrentSpeed < maxBackwardSpeed) {
          newCurrentSpeed = maxBackwardSpeed;
        }
        currentSpeed = newCurrentSpeed;
      } else {
        prevY = game.input.y;
      }
    }
    if (game.input.activePointer.isUp) {
      prevY = false;
      currentSpeed = currentSpeed <= 1 ? 0 : currentSpeed * 0.9;
    }
  }

  this.update = function(sprite) {
    updateCurrentSpeed();
    if (game.input.activePointer.isDown) {
      if (prevX) {
        firstMoveMade = true;
        let newAngle = sprite.angle + game.input.x - prevX;
        sprite.angle = newAngle;
        x = currentSpeed * Math.cos(sprite.angle * Math.PI / 180);
        y = currentSpeed * Math.sin(sprite.angle * Math.PI / 180);
      }
      prevX = game.input.x;
    }
    if (game.input.activePointer.isUp) {
      prevX = false;
      x = currentSpeed * Math.cos(sprite.angle * Math.PI / 180);
      y = currentSpeed * Math.sin(sprite.angle * Math.PI / 180);
    }
  }
}