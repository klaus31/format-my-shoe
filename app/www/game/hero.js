let Hero = function() {

  const ME = this;
  const FRAMES = 8;

  let hero;
  let life;
  let onTimeout;
  let drive;

  const STARTING_POSITION = {
    x: 16 * 2,
    y: 16 * 2
  }

  this.preload = function() {
    game.load.spritesheet('hero', 'game/hero.png', 16, 16);
    onTimeout = null;
    life = new Life();
    drive = new Drive();
  }

  this.onTimeout = function(func) {
    onTimeout = func;
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
    drive.stop();
  }


  this.update = function() {
    if (drive.firstMoveMade() && !life.lifeStarted()) {
      life.start();
    }
    life.update();
    if (life.isDead()) {
      ME.kill();
      if (onTimeout) onTimeout();
    }
    hero.frame = life.getExpectation(FRAMES);
    hero.body.velocity.x = drive.getX();
    hero.body.velocity.y = drive.getY();
  }
}