let Game = function() {

  const hero = new Hero();
  const rank = new Rank();
  const ground = new Ground();
  const ledge = new Ledge();
  const beer = new Beer();

  let collisionGroup;
  let cursors;

  this.preload = function() {
    cursors = game.input.keyboard.createCursorKeys();

    hero.load(game);
    rank.load(game);
    ground.load(game);
    ledge.load(game);
    beer.load(game);
  }

  this.create = function() {
      game.physics.startSystem(Phaser.Physics.ARCADE);
      game.stage.backgroundColor = "#B0D0FF";

      collisionGroup = game.add.group();
      collisionGroup.enableBody = true;

      rank.addToGroup(collisionGroup, game.world.width - 64,  game.world.height - 160, 2);
      rank.addToGroup(collisionGroup, 0,  game.world.height - 160, 3);

      ground.addToGroup(collisionGroup, 0, game.world.height - 64);
      ground.addToGroup(collisionGroup, 425, game.world.height - 64);

      ledge.addToGroup(collisionGroup, 400, 340);
      ledge.addToGroup(collisionGroup, 500, 100);
      ledge.addToGroup(collisionGroup, -150, 200);

      beer.addToGroup(collisionGroup, game.world.width - 450, game.world.height - 64 - 32);

      hero.addToGame(game, game.world.width / 2, game.world.height - 150);
  }

  this.update = function() {
    hero.update(game, collisionGroup, cursors);
  }
}
