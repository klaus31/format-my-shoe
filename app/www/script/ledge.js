let Ledge = function() {
  const key = 'ledge-' + Util.createRandomString();

  this.load = function(game) {
    game.load.image(key, 'assets/ledge.png');
  }

  this.addToGroup = function(collisionGroup, x, y) {
    let ground = collisionGroup.create(x, y, key);
    ground.body.immovable = true;
  }
}