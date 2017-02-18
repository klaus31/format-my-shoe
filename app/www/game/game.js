let Game = function() {

  let labyrinth;
  let hero;
  let map;
  let layer;
  let endedGame = false;
  let drive = new Drive();

  this.preload = function() {
    const level = levelCtrl.getCurrentLevel();
    hero = new Hero();
    labyrinth = new Labyrinth(level);
    labyrinth.preload();
    hero.preload();
    endedGame = false;
  }

  this.create = function() {
    game.stage.backgroundColor = '#000';
    labyrinth.create();
    labyrinth.onWallHit(endGameFail);
    hero.onTimeout(endGameFail);
    labyrinth.onGoalHit(endGameWin);
    labyrinth.onHealthHit(hero.heal);
    labyrinth.onPauseHit(hero.pause);
    labyrinth.onSpeedHit(hero.speedUp);
    hero.create();
  }

  let endGame = function(won) {
    if (!endedGame) {
      hero.kill();
      levelCtrl.setCurrentLevelPlayed();
      levelCtrl.setCurrentLevelWon(won);
      levelCtrl.getCurrentLevel().persist();
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
    hero.update();
  }
}
