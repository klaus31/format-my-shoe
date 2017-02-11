let Game = function() {

  const ID_WALL = 2;
  const labyrinth = new Labyrinth();

  let map;
  let layer;
  let cursors;

  this.preload = function() {
    cursors = game.input.keyboard.createCursorKeys();
    labyrinth.preload();
  }

  this.create = function() {
    labyrinth.create();
    labyrinth.onWallHit(function() {
      window.alert('kaputt');
    });
  }

  this.update = function() {
    // labyrinth.update();
  }
}
