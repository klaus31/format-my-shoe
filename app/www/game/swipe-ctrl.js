// FIXME raus
let SwipeCtrl = function() {

  let onUp;
  let onRight;
  let onDown;
  let onLeft;
  let swipeCoordX1;
  let swipeCoordY1;
  let swipeCoordX2;
  let swipeCoordY2;
  const swipeMinDistance = 20;
  const ME = this;

  this.onUp = function(func) {
    onUp = func;
    return ME;
  }
  this.onRight = function(func) {
    onRight = func;
    return ME;
  }
  this.onDown = function(func) {
    onDown = func;
    return ME;
  }
  this.onLeft = function(func) {
    onLeft = func;
    return ME;
  }

  this.activate = function() {
    game.input.onDown.add(function(pointer) {
      swipeCoordX = pointer.clientX;
      swipeCoordY = pointer.clientY;
    }, this);
    game.input.onUp.add(function(pointer) {
      swipeCoordX2 = pointer.clientX;
      swipeCoordY2 = pointer.clientY;
      if (swipeCoordX2 < swipeCoordX - swipeMinDistance) {
        console.info('l')
        onLeft();
      } else if (swipeCoordX2 > swipeCoordX + swipeMinDistance) {
        console.info('r')
        onRight();
      } else if (swipeCoordY2 < swipeCoordY - swipeMinDistance) {
        console.info('u')
        onUp();
      } else if (swipeCoordY2 > swipeCoordY + swipeMinDistance) {
        console.info('d')
        onDown();
      }
    }, this);
  }
}