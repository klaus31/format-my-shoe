let Apple = function() {

  let apple;
  const ME = this;

  let i = 0;
  let increment = true;

  this.preload = function() {
    game.load.spritesheet('apple', 'assets/apple.png', 16, 16);
  }

  this.create = function() {
    // TODO hier muss der apfel zufaellig in die naehe des helden gesetzt werden
    apple = game.add.sprite(positions[i % positions.length].x, positions[i % positions.length].y, 'apple');
    game.physics.enable(apple, Phaser.Physics.ARCADE);
    i += increment ? 1 : -1;
    if (i == 0 || i == positions.length - 1) increment = !increment;
  }

  this.recreate = function() {
    apple.kill();
    ME.create();
  }

  this.reset = function() {
    i=0;
    increment = true;
    ME.recreate();
  }

  this.getSprite = function() {
    return apple;
  }
}
