let Drive = function(speed) {

const ME = this;
  let x, y, firstMoveMade = false, wasDown = false, angleDelta = 1;

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
    if(game.input.activePointer.isDown) {
      wasDown = true;
      ME.stop();
      // var tmpX = game.input.worldX - sprite.world.x;
      // var tmpY = game.input.worldY - sprite.world.y;
      // sprite.angle = Math.atan2(tmpY, tmpX) * 180 / Math.PI;
      sprite.angle += angleDelta;
      angleDelta *= 1.01;
    };
    if(wasDown && game.input.activePointer.isUp) {
      firstMoveMade = true;
      angleDelta = 1;
      x = speed * Math.cos(sprite.angle * Math.PI / 180);
      y = speed * Math.sin(sprite.angle * Math.PI / 180);
    };
  }
}
