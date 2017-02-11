let Hero = function() {

  let hero;

  const STARTING_POSITION = {
    x: GameData.width / 2 - 8,
    y: GameData.height / 2 - 8
  }

  this.preload = function() {
    game.load.spritesheet('hero', 'assets/hero.png', 16, 16);
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

  this.kill = function() {
    console.info('Hero killed'); // TODO raus
    hero.position.x = STARTING_POSITION.x;
    hero.position.y = STARTING_POSITION.y;
    hero.body.velocity.x = 0;
    hero.body.velocity.y = 0;
  }

  this.update = function(cursors) {
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