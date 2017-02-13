let Labyrinth = function(hole) {

  const ID_WALL = 1;
  const ID_APPLE = 2;

  let map;
  let layer;
  let speedSteps = 10;
  let healthsEaten = [];

  this.preload = function() {
    game.load.tilemap('map', 'levels/level-01.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('wall', 'levels/wall.png');
    game.load.image('health', 'levels/health.png');
  }

  this.create = function() {
    map = game.add.tilemap('map');
    layer = map.createLayer('level-01');
    layer.resizeWorld();
    map.setCollisionBetween(1, 12);
    game.physics.enable(layer);
    map.addTilesetImage('wall');
    map.addTilesetImage('health');
  }

  this.onWallHit = function(func) {
    map.setTileIndexCallback(ID_WALL, func, this);
  }

  this.onAppleHit = function(func) {
    map.setTileIndexCallback(ID_APPLE, function(sprite, tile){
      if(tile.alpha == 1)func();
      healthsEaten.push(tile);
      tile.alpha = 0.2;
      }, this);
  }

  this.resetApples = function() {
    let i = healthsEaten.length;
    while(i--) healthsEaten[i].alpha = 1;
  }

  this.getLayer = function() {
    return layer;
  }

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
