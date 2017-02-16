let Game = function() {

  let labyrinth;
  let hero;
  let map;
  let layer;
  let cursors;
  let endedGame = false;
  let direction = new Direction();

  this.preload = function() {
    cursors = game.input.keyboard.createCursorKeys();
    const level = levelCtrl.getCurrentLevel();
    hero = new Hero(level, direction);
    labyrinth = new Labyrinth(level);
    labyrinth.preload();
    hero.preload();
    endedGame = false;
  }

  this.create = function() {
    game.stage.backgroundColor = '#000';
    const swipeCtrl = new SwipeCtrl();
    swipeCtrl.onUp(function() {
        direction.setDirection('u');
      })
      .onRight(function() {
        direction.setDirection('r');
      })
      .onDown(function() {
        direction.setDirection('d');
      })
      .onLeft(function() {
        direction.setDirection('l');
      }).activate();
    labyrinth.create();
    labyrinth.onWallHit(endGameFail);
    hero.onTimeout(endGameFail);
    labyrinth.onGoalHit(endGameWin);
    labyrinth.onHealthHit(hero.fillTime);
    labyrinth.onPauseHit(hero.pause);
    labyrinth.onSpeedHit(hero.speedUp);
    hero.create();
  }

  let endGame = function(won) {
    if (!endedGame) {
      hero.kill();
      levelCtrl.setCurrentLevelPlayed();
      levelCtrl.setCurrentLevelWon(won);
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
    if (cursors.down.isDown) {
      direction.setDirection('d');
    } else if (cursors.up.isDown) {
      direction.setDirection('u');
    } else if (cursors.right.isDown) {
      direction.setDirection('r');
    } else if (cursors.left.isDown) {
      direction.setDirection('l');
    }
    hero.update(cursors);
  }
}