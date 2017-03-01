let Drive = function(hero) {

  const ME = this;
  let x;
  let y;
  let firstMoveMade = false;
  let wasDown = false;
  let speed = hero.getMaximalSpeed();
  let swipe = {
    minDistance: 20
  }

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
      if (game.input.activePointer.isDown) {
        if (!wasDown) {
          swipe.downX = game.input.x - 0;
          swipe.downY = game.input.y - 0;
        }
        wasDown = true;
      }
      if (wasDown && game.input.activePointer.isUp) {
        swipe.upX = game.input.x - 0;
        swipe.upY = game.input.y - 0;
        firstMoveMade = true;
        let horizontalSwipe = Math.abs(swipe.downX - swipe.upX) > Math.abs(swipe.downY - swipe.upY);
        if (horizontalSwipe && swipe.upX < swipe.downX - swipe.minDistance) {
          hero.rotateToLeft();
        } else if (horizontalSwipe && swipe.upX > swipe.downX + swipe.minDistance) {
          hero.rotateToRight();
        } else if (swipe.upY < swipe.downY - swipe.minDistance) {
          hero.rotateToTop();
        } else if (swipe.upY > swipe.downY + swipe.minDistance) {
          hero.rotateToBottom();
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
        wasDown = false;
      }
    }
  }
}
