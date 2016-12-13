let GridLayout = function() {

  const CUBES_X = 25;
  const CUBES_Y = 19;

  this.getDisplayWidth = function() {
    return getCubeSize().w * CUBES_X; // TODO das ist Unsinn
  }

  this.getDisplayHeight = function() {
    return getCubeSize().h * CUBES_Y; // TODO das ist Unsinn
  }

  this.getGrid = function(posX, posY) {
    let x = posX < 0 ? CUBES_X + posX : posX;
    let y = posY < 0 ? CUBES_Y + posY : posY;
    let result = {};
    result.x = x;
    result.y = y;
    result.getXPx = function() {
      return getCubeSize().w * result.x;
    };
    result.getYPx = function() {
      return getCubeSize().h * result.y;
    };
    return result;
  }

  let getCubeSize = function() {
    return {
      w: 32,
      h: 32
    }; // TODO das ist Unsinn
  }
}