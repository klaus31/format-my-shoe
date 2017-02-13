let Game = function() {

  const labyrinth = new Labyrinth();
  const hero = new Hero();

  let map;
  let layer;
  let cursors;
  let wallHit = false;


  this.preload = function() {
    cursors = game.input.keyboard.createCursorKeys();
    labyrinth.preload();
    hero.preload();
    wallHit = false;
  }

  this.create = function() {
    labyrinth.create();
    labyrinth.onWallHit(endGame);
    labyrinth.onAppleHit(hero.fillTime);
    hero.create();
  }

  let endGame = function() {
    if (!wallHit) {
      hero.kill();
      resultscreen.setPointsToShow(labyrinth.countHealthsEaten());
      labyrinth.resetApples();
      game.state.start('Resultscreen');
      wallHit = true;
    }
  }

  this.update = function() {
    game.physics.arcade.collide(hero.getSprite(), labyrinth.getLayer());
    hero.update(cursors);
  }
}