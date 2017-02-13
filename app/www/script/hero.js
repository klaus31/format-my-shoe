let Hero = function() {

  const ME = this;

  let hero;
  let currentFrame = 0;
  let onKill;
  let onTimeout;
  let updateCount = 0;
  let frameEvery = 5;
  let firstMoveMade = false;

  const STARTING_POSITION = {
    x: 16 * 5,
    y: 16 * 5
  }

  this.preload = function() {
    game.load.spritesheet('hero', 'assets/hero.png', 16, 16);
    firstMoveMade = false;
    updateCount = 0;
    currentFrame = 0;
    frameEvery = 5;
    onTimeout = null;
  }

  this.onKill = function(func) {
    onKill = func;
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
    return currentFrame = currentFrame < 50 ? 0 : currentFrame - 50;
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
    if (firstMoveMade && updateCount++ == frameEvery) {
      updateCount = 0;
      currentFrame += 1;
    }
    if (currentFrame == 128) {
      ME.kill();
      onTimeout();
    }
    const SPEED = 150;
    if (cursors.left.isDown) {
      hero.body.velocity.x = SPEED * -1;
      hero.body.velocity.y = 0;
      firstMoveMade = true;
    } else if (cursors.right.isDown) {
      hero.body.velocity.x = SPEED;
      hero.body.velocity.y = 0;
      firstMoveMade = true;
    } else if (cursors.down.isDown) {
      hero.body.velocity.y = SPEED;
      hero.body.velocity.x = 0;
      firstMoveMade = true;
    } else if (cursors.up.isDown) {
      hero.body.velocity.y = SPEED * -1;
      hero.body.velocity.x = 0;
      firstMoveMade = true;
    }
  }
}
