let Hero = function() {

  const ME = this;
  const FRAMES = 256;

  let hero;
  let life;
  let onDead;
  let drive;

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
    return hero.body.velocity.x || hero.body.velocity.y;
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

  this.update = function() {
    updateLife();
    updateDrive();
  }
}
