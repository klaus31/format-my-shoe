let Game = function() {

  const labyrinth = new Labyrinth();
  const hero = new Hero();

  let map;
  let layer;
  let cursors;

  this.preload = function() {
    cursors = game.input.keyboard.createCursorKeys();
    labyrinth.preload();
    hero.preload();
  }

  this.create = function() {
    labyrinth.create();
    hero.create();
  }

  this.update = function() {
    hero.update(cursors);
  }
}
