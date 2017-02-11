let Game = function() {

  const labyrinth = new Labyrinth();
  const hero = new Hero();
  const apple = new Apple();

  let map;
  let layer;
  let cursors;

  this.preload = function() {
    cursors = game.input.keyboard.createCursorKeys();
    labyrinth.preload();
    hero.preload();
    apple.preload();
  }

  this.create = function() {
    labyrinth.create();
    labyrinth.onWallHit(function() {
      hero.kill();
    });
    hero.create();
    apple.create();
  }

  this.update = function() {
    const eatApple = game.physics.arcade.collide(apple.getSprite(), hero.getSprite());
    if(eatApple) {
      apple.recreate();
    }
    game.physics.arcade.collide(hero.getSprite(), labyrinth.getLayer());
    hero.update(cursors);
  }
}
