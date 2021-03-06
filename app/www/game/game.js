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
    helper = new Helper(level, hero);
    game.load.image('game-background', 'game/levels/wall.png');
    labyrinth.preload();
    hero.preload();
    helper.preload();
    endedGame = false;
    setGlobalScalingRules();
  }

  this.create = function() {
    let background = game.add.tileSprite(0, 0, game.width, game.height, 'game-background');
    labyrinth.create();
    hero.onDead(endGameFail);
    labyrinth.onGoalHit(endGameWin);
    labyrinth.onHealthHit(hero.heal);
    labyrinth.onDeadwallHit(hero.burn);
    labyrinth.onDirectionChangeHit(hero.changeDirectionTo);
    helper.onAbort(hero.kill);
    hero.create();
    helper.create();
    background.height = Math.max(labyrinth.getHeight(), game.height);
    background.width = game.width;
  }

  let endGame = function(won) {
    if (!endedGame) {
      levelCtrl.setCurrentLevelPlayed();
      levelCtrl.setCurrentLevelWon(won);
      levelCtrl.getCurrentLevel().end();
      if (won) {
        levelCtrl.getCurrentLevel().persist(hero.getStopsMade());
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
