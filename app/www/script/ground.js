let Ground = function() {
  const key = 'ground-' + Util.createRandomString();

  this.load = function(game) {
    game.load.image(key, 'assets/ground.png');
  }

  this.addToGroup = function(collisionGroup, x, y) {
    let ground = collisionGroup.create(x, y, key);
    ground.body.immovable = true;
  }
}