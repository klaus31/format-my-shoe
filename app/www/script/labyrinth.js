var Labyrinth = function(hole) {

  const ID_WALL = 1;

  var map;
  var layer;

  this.preload = function() {
    var basicDir = 'levels/';
    game.load.tilemap('map', basicDir + 'level-01.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('wall', basicDir + 'wall.png');
  }

  this.create = function() {
    map = game.add.tilemap('map');
    layer = map.createLayer('level-01');
    map.setCollisionBetween(1, 12);
    game.physics.enable(layer);
    map.addTilesetImage('wall');
  };

  this.onWallHit = function(func) {
    map.setTileIndexCallback(ID_WALL, func, this);
  }
}
