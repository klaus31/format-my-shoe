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

  const STARTING_POSITION = levelCtrl.getCurrentLevel().getStartingPosition();

  this.preload = function() {
    game.load.spritesheet('hero', 'game/hero.png', 16, 16);
    onDead = null;
    life = new Life();
    drive = new Drive(ME);
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
      ME.kill();
    }
  }
  let updateDrive = function() {
    drive.update();
    hero.body.velocity.x = drive.getX();
    hero.body.velocity.y = drive.getY();
  }

  let lastBlocked = false;
  this.update = function() {
    updateLife();
    updateDrive();
    // rotate hero
    if(ME.isMoving()) {
      if(hero.body.blocked.up) {
        lastBlocked = 'up';
      } else if(hero.body.blocked.right) {
        lastBlocked = 'right';
      } else if(hero.body.blocked.down) {
        lastBlocked = 'down';
      } else if(hero.body.blocked.left) {
        lastBlocked = 'left';
      }
      if(drive.getDirection() == 'up') {
        angleUpdateDeg = lastBlocked == 'left' ? -10 : 10;
      } else if(drive.getDirection() == 'right') {
        angleUpdateDeg = lastBlocked == 'down' ? 10 : -10;
      } else if(drive.getDirection() == 'down') {
        angleUpdateDeg = lastBlocked == 'right' ? -10 : 10;
      } else if(drive.getDirection() == 'left') {
        angleUpdateDeg = lastBlocked == 'down' ? -10 : 10;
      }
      hero.angle += angleUpdateDeg;
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
