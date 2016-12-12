let Hero = function() {

  let player;

  const createRandomString = function() {
    return Math.random().toString(36).substring(7);
  }
  const key = 'hero-' + createRandomString();
  const url = 'assets/dude.png';
  const frameWidth = 32;
  const frameHeight = 48;
  const updateAnimation = function(cursors) {
    if (cursors.left.isDown) {
        player.body.velocity.x = -150;
        player.animations.play('left');
    } else if (cursors.right.isDown) {
        player.body.velocity.x = 150;
        player.animations.play('right');
    } else {
        player.animations.stop();
        player.frame = 4;
    }
  }

  const handleCollision = function(game, collidingGroup, cursors) {
    const hit = game.physics.arcade.collide(player, collidingGroup);
    if (cursors.up.isDown && player.body.touching.down && hit) {
        player.body.velocity.y = -350;
    }
  }

  const addPhysics = function(game) {
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
  }

  const addAnimations = function() {
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
  }

  this.update = function(game, collidingGroup, cursors) {
    player.body.velocity.x = 0;
    updateAnimation(cursors);
    handleCollision(game, collidingGroup, cursors);
  }


    this.load = function(game) {
      game.load.spritesheet(key, url, frameWidth, frameHeight);
    }

    this.addToGame = function(game, x, y) {
      player = game.add.sprite(x, y, key);
      addPhysics(game);
      addAnimations();
    }

}
