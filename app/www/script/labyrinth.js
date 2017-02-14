let Labyrinth = function(hole) {

  const ID_WALL = 1;
  const ID_APPLE = 2;
  const ID_GOAL = 3;

  let map;
  let layer;

  this.preload = function() {
    let level = Levels[GameProperties.currentLevel];
    game.load.tilemap('map', 'levels/' + level.name + '.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('wall', 'levels/wall.png');
    game.load.image('health', 'levels/health.png');
    game.load.image('goal', 'levels/goal.png');
  }

  this.create = function() {
    map = game.add.tilemap('map');
    layer = map.createLayer('layer');
    layer.resizeWorld();
    map.setCollisionBetween(1, 12);
    game.physics.enable(layer);
    map.addTilesetImage('wall');
    map.addTilesetImage('health');
    map.addTilesetImage('goal');
  }

  this.onWallHit = function(func) {
    map.setTileIndexCallback(ID_WALL, func, this);
  }

  this.onGoalHit = function(func) {
    map.setTileIndexCallback(ID_GOAL, func, this);
  }

  this.onAppleHit = function(func) {
    map.setTileIndexCallback(ID_APPLE, function(sprite, tile) {
      if (tile.alpha == 1) {
        tile.alpha = 0.2;
        layer.dirty = true;
        func();
      }
    }, this);
  }

  this.getLayer = function() {
    return layer;
  }
}
