let Beer = function() {

  const key = 'beer-' + Util.createRandomString();

  this.load = function(game) {
    game.load.image(key, 'assets/gold.png');
  }

  this.addToGroup = function(collisionGroup, x, y) {
    let ground = collisionGroup.create(x, y, key);
    ground.body.immovable = true;
  }
}
