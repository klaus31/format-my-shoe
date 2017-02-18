let Drive = function(speed) {

const ME = this;
  let x, y, firstMoveMade = false;

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
      ME.stop();
      var tmpX = game.input.worldX - sprite.world.x;
      var tmpY = game.input.worldY - sprite.world.y;
      sprite.angle = Math.atan2(tmpY, tmpX) * 180 / Math.PI;
    };
    if(game.input.activePointer.isUp) {
      firstMoveMade = true;
      x = speed * Math.cos(sprite.angle * Math.PI / 180);
      y = speed * Math.sin(sprite.angle * Math.PI / 180);
    };
  }
}
