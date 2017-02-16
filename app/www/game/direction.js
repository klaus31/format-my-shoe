let Direction = function(cursors) {

  let calcPositions = function(sprite) {
    if (game.input.activePointer.isDown) {
      let dx = sprite.world.x - game.input.worldX;
      let dy = sprite.world.y - game.input.worldY;
      let h = dx < 0 ? 'r' : 'l';
      let v = dy < 0 ? 'd' : 'u';
      return Math.abs(dx) > Math.abs(dy) ? h : v;
    } else {
      return false;
    }
  }

  this.goLeft = function(sprite) {
    return cursors.left.isDown || calcPositions(sprite) === 'l';
  }
  this.goRight = function(sprite) {
    return cursors.right.isDown || calcPositions(sprite) === 'r';
  }
  this.goUp = function(sprite) {
    return cursors.up.isDown || calcPositions(sprite) === 'u';
  }
  this.goDown = function(sprite) {
    return cursors.down.isDown || calcPositions(sprite) === 'd';
  }
}