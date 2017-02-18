let Hero = function() {

  const ME = this;
  const FRAMES = 8;

  let hero;
  let life;
  let onDead;
  let drive;

  const STARTING_POSITION = levelCtrl.getCurrentLevel().getStartingPosition();

  this.preload = function() {
    game.load.spritesheet('hero', 'game/hero.png', 16, 16);
    onDead = null;
    life = new Life();
    drive = new Drive(levelCtrl.getCurrentLevel().getHeroSpeed());
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
    if (onDead) onDead();
  }
  // FIXME buggy mit hack scheiße
  let suppressWallHitHack = 0;
  this.changeDirectionOnWall = function(hero, wall) {
    if(suppressWallHitHack) return suppressWallHitHack--;
    if(wall.faceTop && wall.faceBottom) {
      hero.angle *= -1;
    } else if(wall.faceLeft && wall.faceRight) {
      hero.angle = hero.angle * -1 + 180;
    }
    suppressWallHitHack = 3;
  }

  let updateLife = function() {
    hero.frame = FRAMES - life.getExpectation(FRAMES);
    if (drive.firstMoveMade() && !life.lifeStarted()) {
      life.start();
    }
    life.update();
    if (life.isDead()) {
      ME.kill();
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
