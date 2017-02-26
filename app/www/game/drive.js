let Drive = function(hero) {

  const ME = this;
  let x;
  let y;
  let firstMoveMade = false;
  let wasUp = false;
  let speed = hero.getMaximalSpeed();

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


  this.update = function() {
    if (!hero.isMoving()) {
      if (wasUp && game.input.activePointer.isDown) {
        wasUp = false;
        if(firstMoveMade) {
          if (game.input.x > game.width / 2) {
            hero.rotateClockwise();
          } else {
            hero.rotateCounterClockwise();
          }
        } else {
          firstMoveMade = true;
        }
        switch (hero.getAngle()) {
          case 90:
            x = 0;
            y = speed;
            break;
          case -180:
            x = speed * -1;
            y = 0;
            break;
          case -90:
            x = 0;
            y = speed * -1;
            break;
          case 0:
            x = speed;
            y = 0;
            break;
        }
      }
      if (game.input.activePointer.isUp) {
        wasUp = true;
      }
    }
  }
}
