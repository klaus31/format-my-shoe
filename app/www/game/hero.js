let Hero = function() {

  const ME = this;
  const FRAMES = 8;

  let hero;
  let life;
  let onTimeout;
  let drive;

  const STARTING_POSITION = levelCtrl.getCurrentLevel().getStartingPosition();

  this.preload = function() {
    game.load.spritesheet('hero', 'game/hero.png', 16, 16);
    onTimeout = null;
    life = new Life();
    drive = new Drive(levelCtrl.getCurrentLevel().getHeroSpeed());
  }

  this.onTimeout = function(func) {
    onTimeout = func;
  }

  this.create = function() {
    hero = game.add.sprite(STARTING_POSITION.x, STARTING_POSITION.y, 'hero');
    hero.anchor.setTo(0.5, 0.5);
    game.physics.enable(hero, Phaser.Physics.ARCADE);
    game.camera.follow(hero);
    hero.body.collideWorldBounds = true;
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
  }

  let updateLife = function() {
    hero.frame = FRAMES - life.getExpectation(FRAMES);
    if (drive.firstMoveMade() && !life.lifeStarted()) {
      console.info('start');
      life.start();
    }
    life.update();
    if (life.isDead()) {
      ME.kill();
      if (onTimeout) onTimeout();
    }
  }
  let updateDrive = function() {
    drive.update(hero);
    hero.body.velocity.x = drive.getX();
    hero.body.velocity.y = drive.getY();
  }

  this.update = function() {
    updateLife();
    updateDrive();
  }
}
