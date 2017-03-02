let Hero = function() {

  const ME = this;
  const FRAMES = 256;

  let hero;
  let life;
  let onDead;
  let drive;
  let lastPosition = false;
  let isMoving = false;
  let moveDirection = false;

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

  this.rotateToLeft = function() {
    moveDirection = 'left';
  }
  this.rotateToTop = function() {
    moveDirection = 'top';
  }
  this.rotateToRight = function() {
    moveDirection = 'right';
  }
  this.rotateToBottom = function() {
    moveDirection = 'bottom';
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

  this.rotateClockwise = function() {
    hero.angle += 90;
  }
  this.rotateCounterClockwise = function() {
    hero.angle -= 90;
  }
  this.getAngle = function() {
    return Math.round(hero.angle);
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

  let todo = 2;
  this.update = function() {
    updateLife();
    updateDrive();
    if(ME.isMoving()) {
      switch(moveDirection) {
        case 'top':
        hero.angle += 10;
        break;
        case 'right':
        hero.angle += 5;
        break;
        case 'bottom':
        hero.angle += -20;
        break;
        case 'left':
        hero.angle -= 10;
        break;
      }
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
