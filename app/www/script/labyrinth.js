var Labyrinth = function(hole) {

  const ID_WALL = 1;

  let map;
  let layer;
  let speedSteps = 10;

  this.preload = function() {
    game.load.tilemap('map', 'levels/level-01.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('wall', 'levels/wall.png');
  }

  this.create = function() {
    map = game.add.tilemap('map');
    layer = map.createLayer('level-01');
    map.setCollisionBetween(1, 12);
    game.physics.enable(layer);
    map.addTilesetImage('wall');
  };


  this.update = function(cursors) {
    if (cursors.left.isDown) {
      layer.cameraOffset.x -= speedSteps;
    } else if (cursors.right.isDown) {
      layer.cameraOffset.x += speedSteps;
    } else if (cursors.up.isDown) {
      layer.cameraOffset.y -= speedSteps;
    } else if (cursors.down.isDown) {
      layer.cameraOffset.y += speedSteps;
    }
  }
}