let Game = function() {

  let labyrinth;
  let hero;
  let map;
  let layer;
  let endedGame = false;
  let helper;

  this.preload = function() {
    const level = levelCtrl.getCurrentLevel();
    hero = new Hero();
    labyrinth = new Labyrinth(level);
    helper = new Helper(level);
    labyrinth.preload();
    hero.preload();
    helper.preload();
    endedGame = false;
    setGlobalScalingRules();
  }

  this.create = function() {
    game.stage.backgroundColor = '#000';
    labyrinth.create();
    hero.onDead(endGameFail);
    labyrinth.onGoalHit(endGameWin);
    labyrinth.onHealthHit(hero.heal);
    hero.create();
    helper.create();
  }

  let endGame = function(won) {
    if (!endedGame) {
      levelCtrl.setCurrentLevelPlayed();
      levelCtrl.setCurrentLevelWon(won);
      levelCtrl.getCurrentLevel().end();
      if (levelCtrl.getCurrentLevel().isStarted()) {
        levelCtrl.getCurrentLevel().persist();
      }
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

  let giveUpClicked = function() {
    return game.input.activePointer.isDown &&
      game.input.x > game.width - 100 &&
      game.input.y < 100;
  }

  this.update = function() {
    game.physics.arcade.collide(hero.getSprite(), labyrinth.getLayer());
    hero.update();
    helper.update();
    if (giveUpClicked()) {
      hero.kill();
    }
  }
}
