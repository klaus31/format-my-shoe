let Hero = function() {

  let hero;

  this.preload = function() {
    game.load.spritesheet('hero', 'assets/hero.png', 16, 16);
  }

  this.create = function() {
    hero = game.add.sprite(GameData.width/2 - 8, GameData.height/2 - 8, 'hero');
    game.physics.enable(hero, Phaser.Physics.ARCADE);
    game.camera.follow(hero);
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
