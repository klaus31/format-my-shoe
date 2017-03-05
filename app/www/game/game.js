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
    labyrinth.onDeadwallHit(hero.burn);
    helper.onAbort(hero.kill);
    hero.create();
    helper.create();
  }

  let endGame = function(won) {
    if (!endedGame) {
      levelCtrl.setCurrentLevelPlayed();
      levelCtrl.setCurrentLevelWon(won);
      levelCtrl.getCurrentLevel().end();
      if (won) {
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

  this.update = function() {
    game.physics.arcade.collide(hero.getSprite(), labyrinth.getLayer());
    hero.update();
    helper.update();
  }
}
