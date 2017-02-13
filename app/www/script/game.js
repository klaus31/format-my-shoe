let Game = function() {

  const labyrinth = new Labyrinth();
  const hero = new Hero();

  let map;
  let layer;
  let cursors;
  let endedGame = false;


  this.preload = function() {
    cursors = game.input.keyboard.createCursorKeys();
    labyrinth.preload();
    hero.preload();
    endedGame = false;
  }

  this.create = function() {
    labyrinth.create();
    labyrinth.onWallHit(endGameFail);
    hero.onTimeout(endGameFail);
    labyrinth.onGoalHit(endGameWin);
    labyrinth.onAppleHit(hero.fillTime);
    hero.create();
  }

  let endGame = function(won) {
    if (!endedGame) {
      hero.kill();
      resultscreen.setWon(won);
      game.state.start('Resultscreen');
      endedGame = true;
    }
  }

  let endGameFail = function() {
    endGame(false);
  }

  let endGameWin = function() {
    endGame(true);
  }

  this.update = function() {
    game.physics.arcade.collide(hero.getSprite(), labyrinth.getLayer());
    hero.update(cursors);
  }
}
