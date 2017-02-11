let Apple = function() {

  let apple;
  const ME = this;
  const positions = [{
    x: 100,
    y: 100
  }, {
    x: 100,
    y: 200
  }, {
    x: 100,
    y: 400
  }, {
    x: 200,
    y: 400
  }, {
    x: 300,
    y: 400
  }, {
    x: 400,
    y: 400
  }, {
    x: 400,
    y: 450
  }, {
    x: 450,
    y: 650
  }]
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

  this.getSprite = function() {
    return apple;
  }
}