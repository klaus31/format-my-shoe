let Drive = function(speed) {

  const ME = this;
  const ANGLE_SNAP_INTO_PLACE = 20;
  let x;
  let y;
  let firstMoveMade = false;
  let wasDown = false;
  let stateBeforePointerDown;

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
      wasDown = true;
      ME.stop();
      if (!stateBeforePointerDown) stateBeforePointerDown = {
        angle: sprite.angle,
        x: game.input.worldX
      };
      let newAngle = stateBeforePointerDown.angle + game.input.worldX - stateBeforePointerDown.x;
      if(Math.abs(newAngle % 90) < ANGLE_SNAP_INTO_PLACE || Math.abs(newAngle % 90) > 90-ANGLE_SNAP_INTO_PLACE) {
        newAngle = Math.round(newAngle / 90) * 90;
      }
      sprite.angle = newAngle;
    };
    if (wasDown && game.input.activePointer.isUp) {
      firstMoveMade = true;
      stateBeforePointerDown = false;
      x = speed * Math.cos(sprite.angle * Math.PI / 180);
      y = speed * Math.sin(sprite.angle * Math.PI / 180);
    };
  }
}
