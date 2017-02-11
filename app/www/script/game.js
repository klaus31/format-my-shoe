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
    labyrinth.onWallHit(function() {
      hero.kill();
    });
    hero.create();
  }

  this.update = function() {
    game.physics.arcade.collide(hero.getSprite(), labyrinth.getLayer());
    hero.update(cursors);
  }
}