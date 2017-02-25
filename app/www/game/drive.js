let Drive = function(speed) {

  const ME = this;
  let x;
  let y;
  let firstMoveMade = false;
  let wasUp = false;

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
      if (wasUp) {
        firstMoveMade = true;
        sprite.angle += game.input.x > game.width / 2 ? 90 : -90;
        wasUp = false;
      }
    }
    if (game.input.activePointer.isUp) {
      wasUp = true;
    }
    console.log(sprite.position.x % 16, sprite.position.y % 16)
    if(Math.round(sprite.position.x) % 8 == 0 && Math.round(sprite.position.y) % 8 == 0 || !firstMoveMade) {
      x = speed * Math.cos(sprite.angle * Math.PI / 180);
      y = speed * Math.sin(sprite.angle * Math.PI / 180);
    }
  }
}
