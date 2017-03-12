let Drive = function(hero) {

  const ME = this;
  let x;
  let y;
  let firstMoveMade = false;
  let wasDown = false;
  const speed = 200;
  let swipe = {
    minDistance: 20
  };
  let newDirection = false;

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

  this.getDirection = function() {
    if (x > 0) return 'right';
    if (x < 0) return 'left';
    if (y > 0) return 'down';
    if (y < 0) return 'up';
    else return null;
  }

  this.isMovingHorizontal = function() {
    return !!x;
  }

  this.isMovingVertical = function() {
    return !!y;
  }

  this.changeDirectionTo = function(sprite, tile, direction) {
    if(hero.isCompletelyOnTile(tile)) {
      if (direction == 'left') {
        x = speed * -1;
        y = 0;
      } else if (direction == 'right') {
        x = speed;
        y = 0;
      } else if (direction == 'up') {
        x = 0;
        y = speed * -1;
      } else if (direction == 'down') {
        x = 0;
        y = speed;
      }
    }
  }


  this.update = function() {
    if (!hero.isMoving()) {
      if (game.input.activePointer.isDown) {
        if (!wasDown) {
          swipe.downX = game.input.x - 0;
          swipe.downY = game.input.y - 0;
        }
        wasDown = true;
      } else if (wasDown && game.input.activePointer.isUp) {
        swipe.upX = game.input.x - 0;
        swipe.upY = game.input.y - 0;
        let horizontalSwipe = Math.abs(swipe.downX - swipe.upX) > Math.abs(swipe.downY - swipe.upY);
        if (horizontalSwipe && swipe.upX < swipe.downX - swipe.minDistance) {
          x = speed * -1;
          y = 0;
          firstMoveMade = true;
        } else if (horizontalSwipe && swipe.upX > swipe.downX + swipe.minDistance) {
          x = speed;
          y = 0;
          firstMoveMade = true;
        } else if (swipe.upY < swipe.downY - swipe.minDistance) {
          x = 0;
          y = speed * -1;
          firstMoveMade = true;
        } else if (swipe.upY > swipe.downY + swipe.minDistance) {
          x = 0;
          y = speed;
          firstMoveMade = true;
        }
        wasDown = false;
      }
    }
  }
}
