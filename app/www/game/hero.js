let Hero = function() {

  const ME = this;
  const FRAMES = 256;

  let hero;
  let life;
  let onDead;
  let drive;
  let lastPosition = false;
  let isMoving = false;
  let angleUpdateDeg = 10;
  let died;
  let fire;
  let hitDeadWall;
  let lifeExpectationEmpty;
  let stopsMade = 0;
  let stopCounted = null;

  const STARTING_POSITION = levelCtrl.getCurrentLevel().getStartingPosition();

  this.preload = function() {
    game.load.spritesheet('hero', 'game/hero.png', 16, 16);
    onDead = null;
    life = new Life();
    drive = new Drive(ME);
    died = false;
    hitDeadWall = false;
    lifeExpectationEmpty = false;
  }

  this.getStopsMade = function() {
    return stopsMade;
  }

  this.getMaximalSpeed = function() {
    return levelCtrl.getCurrentLevel().getHeroSpeed();
  }

  this.onDead = function(func) {
    onDead = func;
  }

  this.create = function() {
    hero = game.add.sprite(STARTING_POSITION.x, STARTING_POSITION.y, 'hero');
    hero.anchor.setTo(0.5, 0.5);
    hero.allowGravity = false;
    game.physics.enable(hero, Phaser.Physics.ARCADE);
    game.camera.follow(hero);
    hero.body.collideWorldBounds = true;
    hero.angle = levelCtrl.getCurrentLevel().getStartAngle();
  }

  this.getSprite = function() {
    return hero;
  }

  this.burn = function() {
    if(!hitDeadWall) {
      died = true;
      hitDeadWall = true;
      hero.body.velocity.x = 0;
      hero.body.velocity.y = 0;
      window.setTimeout(ME.kill, 2500);
    }
  }

  this.heal = function() {
    return life.heal(35);
  }

  this.kill = function() {
    hero.position.x = STARTING_POSITION.x;
    hero.position.y = STARTING_POSITION.y;
    drive.stop();
    levelCtrl.getCurrentLevel().end();
    if (onDead) onDead();
  }
  this.isMoving = function() {
    return isMoving;
  }

  let updateLife = function() {
    hero.frame = FRAMES - life.getExpectation(FRAMES);
    if (drive.firstMoveMade() && !life.lifeStarted()) {
      life.start();
      levelCtrl.getCurrentLevel().start();
    }
    life.update();
    if (life.isDead()) {
      died = true;
      levelCtrl.setGotTimeout();
      ME.kill();
    }
  }
  let updateDrive = function() {
    drive.update();
    hero.body.velocity.x = drive.getX();
    hero.body.velocity.y = drive.getY();
  }

  this.update = function() {
    if (died) {
      if (hitDeadWall && hero.alpha) {
        hero.alpha -= 0.01;
        if(hero.alpha < 0.02) hero.alpha = 0;
      }
    } else {
      updateLife();
      updateDrive();
      // rotate hero
      if (isMoving) {
        let pos = (hero.position.x - 8) % 16 || (hero.position.y - 8) % 16;
        hero.angle = pos * 90 / 16;
      }
      // set stop count
      if (!isMoving && drive.firstMoveMade() && stopCounted === false) {
        stopsMade++;
        stopCounted = true;
      } else if (isMoving && drive.firstMoveMade()) {
        stopCounted = false;
      }
      // correct position and set info, if sprite is moving manualy
      if (lastPosition) {
        isMoving = Math.round(lastPosition.x) != Math.round(hero.position.x) || Math.round(lastPosition.y) != Math.round(hero.position.y);
        if (!isMoving) {
          hero.position.x = Math.round(hero.position.x);
          hero.position.y = Math.round(hero.position.y);
        }
      }
      lastPosition = {
        x: Math.round(hero.position.x - 0),
        y: Math.round(hero.position.y - 0)
      };
    }
  }
}
