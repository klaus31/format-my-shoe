let Hero = function(levelInfo, direction) {

  const ME = this;

  let hero;
  let currentFrame = 0;
  let onKill;
  let onTimeout;
  let updateCount = 0;
  const FRAME_EVERY = 80;
  const FRAMES = 8;
  const FRAMES_ON_HEALTH = 3;
  let firstMoveMade = false;
  let pauseSteps = 0;
  let pauseCache;
  const SPEED_BASE = levelInfo.getHeroSpeed();
  let speed = SPEED_BASE - 0;

  const STARTING_POSITION = {
    x: 16 * 2,
    y: 16 * 2
  }

  this.preload = function() {
    game.load.spritesheet('hero', 'game/hero.png', 16, 16);
    firstMoveMade = false;
    updateCount = 0;
    currentFrame = 0;
    onTimeout = null;
    pauseSteps = 0;
    pauseCache = false;
    speed = SPEED_BASE - 0;
  }

  this.onKill = function(func) {
    onKill = func;
  }

  this.onTimeout = function(func) {
    onTimeout = func;
  }

  this.pause = function() {
    pauseSteps = 35;
  }

  this.speedUp = function() {
    speed = SPEED_BASE * 5;
  }

  this.create = function() {
    hero = game.add.sprite(STARTING_POSITION.x, STARTING_POSITION.y, 'hero');
    game.physics.enable(hero, Phaser.Physics.ARCADE);
    game.camera.follow(hero);
    hero.body.collideWorldBounds = true;
  }

  this.getSprite = function() {
    return hero;
  }

  this.fillTime = function() {
    return currentFrame = currentFrame < FRAMES_ON_HEALTH ? 0 : currentFrame - FRAMES_ON_HEALTH;
  }

  this.kill = function() {
    hero.position.x = STARTING_POSITION.x;
    hero.position.y = STARTING_POSITION.y;
    hero.body.velocity.x = 0;
    hero.body.velocity.y = 0;
    updateCount = 0;
    currentFrame = 0;
    direction.setDirection('s');
    if (onKill) onKill();
  }

  this.update = function(cursors) {
    hero.frame = currentFrame;
    /*
    ---
    // TODO die Geschichte läuft hier aus dem Ruder.
    // Du musst verschiedene Eigenschaften kapseln und hier aufrufen:
    // idee:
    hero.frame = frameCtrl.next();
    if(frameCtrl.isLast()) {
      ME.kill();
      onTimeout();
    } else {
      pauseCtrl.update(cursors);
      speedCtrl.update(cursors);
      directionCtrl.switch(); usw.
    }
    ---
    */


    if (!direction.stop() && updateCount++ == FRAME_EVERY) {
      updateCount = 0;
      currentFrame += 1;
    }
    if (currentFrame == FRAMES) {
      ME.kill();
      onTimeout();
    }
    if (pauseSteps > 0) {
      if (!pauseCache) pauseCache = {
        x: hero.body.velocity.x,
        y: hero.body.velocity.y
      };
      if ((direction.goLeft() || direction.goRight()) && pauseCache.y) {
        pauseCache.x = pauseCache.y;
        pauseCache.y = 0;
      } else if ((direction.goUp() || direction.goDown()) && pauseCache.x) {
        pauseCache.y = pauseCache.x;
        pauseCache.x = 0;
      }
      pauseSteps--;
      if (pauseSteps) {
        hero.body.velocity.x = 0;
        hero.body.velocity.y = 0;
        speed = SPEED_BASE - 0;
      } else {
        hero.body.velocity.x = pauseCache.x;
        hero.body.velocity.y = pauseCache.y;
        pauseCache = false;
      }
    } else if (direction.goLeft()) {
      hero.body.velocity.x = speed * -1;
      hero.body.velocity.y = 0;
      firstMoveMade = true;
    } else if (direction.goRight()) {
      hero.body.velocity.x = speed;
      hero.body.velocity.y = 0;
      firstMoveMade = true;
    } else if (direction.goDown()) {
      hero.body.velocity.y = speed;
      hero.body.velocity.x = 0;
      firstMoveMade = true;
    } else if (direction.goUp()) {
      hero.body.velocity.y = speed * -1;
      hero.body.velocity.x = 0;
      firstMoveMade = true;
    } else {
      if (hero.body.velocity.x > 0) hero.body.velocity.x = speed;
      if (hero.body.velocity.x < 0) hero.body.velocity.x = speed * -1;
      if (hero.body.velocity.y > 0) hero.body.velocity.y = speed;
      if (hero.body.velocity.y < 0) hero.body.velocity.y = speed * -1;
    }
    if (speed > SPEED_BASE) {
      speed -= 5;
    }
  }
}