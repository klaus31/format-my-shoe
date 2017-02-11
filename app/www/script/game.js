let Game = function() {

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
  }

  this.update = function() {
    labyrinth.update(cursors);
  }
}