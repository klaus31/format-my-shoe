let Hero = function() {

  const ME = this;

  let hero;
  let currentFrame = 0;
  let onKill;
  let updateCount = 0;
  let frameEvery = 5;

  const STARTING_POSITION = {
    x: 16 * 5,
    y: 16 * 5
  }

  this.preload = function() {
    game.load.spritesheet('hero', 'assets/hero.png', 16, 16);
  }

  this.onKill = function(func) {
    onKill = func;
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
    return currentFrame = 0;
  }

  this.kill = function() {
    hero.position.x = STARTING_POSITION.x;
    hero.position.y = STARTING_POSITION.y;
    hero.body.velocity.x = 0;
    hero.body.velocity.y = 0;
    updateCount = 0;
    currentFrame = 0;
    if (onKill) onKill();
  }

  this.update = function(cursors) {
    hero.frame = currentFrame;
    if (updateCount++ == frameEvery) {
      updateCount = 0;
      currentFrame += 1;
    }
    if (currentFrame == 128) {
      ME.kill();
    }
    if (cursors.left.isDown) {
      hero.body.velocity.x -= 10;
    } else if (cursors.right.isDown) {
      hero.body.velocity.x += 10;
    } else if (cursors.down.isDown) {
      hero.body.velocity.y += 10;
    } else if (cursors.up.isDown) {
      hero.body.velocity.y -= 10;
    }
  }
}
