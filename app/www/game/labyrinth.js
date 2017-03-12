let Labyrinth = function(levelInfo) {

  const ID_WALL = 1;
  const ID_HEALTH = 2;
  const ID_GOAL = 3;
  const ID_DEADWALL = 4;
  const ID_DIRECTION_UP = 5;
  const ID_DIRECTION_RIGHT = 6;
  const ID_DIRECTION_DOWN = 7;
  const ID_DIRECTION_LEFT = 8;

  let map;
  let layer;
  this.preload = function() {
    game.load.tilemap('map', 'game/levels/' + levelCtrl.getCurrentLevel().getFilename(), null, Phaser.Tilemap.TILED_JSON);
    game.load.image('wall', 'game/levels/wall.png');
    game.load.image('health', 'game/levels/health.png');
    game.load.image('goal', 'game/levels/goal.png');
    game.load.image('deadwall', 'game/levels/deadwall.png');
    game.load.image('direction-up', 'game/levels/direction-up.png');
    game.load.image('direction-right', 'game/levels/direction-right.png');
    game.load.image('direction-down', 'game/levels/direction-down.png');
    game.load.image('direction-left', 'game/levels/direction-left.png');
    game.load.image('background', 'game/bg.png');
  }

  this.create = function() {
    let background = game.add.tileSprite(0, 0, game.width, game.height, 'background');
    map = game.add.tilemap('map');
    layer = map.createLayer('layer');
    layer.resizeWorld();
    background.height = map.height * 16;
    background.width = map.width * 16;
    map.setCollisionBetween(1, 12);
    game.physics.enable(layer);
    map.addTilesetImage('wall');
    map.addTilesetImage('health');
    map.addTilesetImage('goal');
    map.addTilesetImage('deadwall');
    map.addTilesetImage('direction-up');
    map.addTilesetImage('direction-right');
    map.addTilesetImage('direction-down');
    map.addTilesetImage('direction-left');
  }

  this.getHeight = function() {
    return map.height * map.tileHeight;
  }

  this.onGoalHit = function(func) {
    map.setTileIndexCallback(ID_GOAL, func);
  }

  this.onDirectionChangeHit = function(func) {
    map.setTileIndexCallback(ID_DIRECTION_UP, function(sprite, tile) {
      func(sprite, tile, 'up');
    });
    map.setTileIndexCallback(ID_DIRECTION_RIGHT, function(sprite, tile) {
      func(sprite, tile, 'right');
    });
    map.setTileIndexCallback(ID_DIRECTION_DOWN, function(sprite, tile) {
      func(sprite, tile, 'down');
    });
    map.setTileIndexCallback(ID_DIRECTION_LEFT, function(sprite, tile) {
      func(sprite, tile, 'left');
    });
  }

  this.onDeadwallHit = function(cb) {
    map.setTileIndexCallback(ID_DEADWALL, cb);
  }

  var oneTimeAction = function(id, func) {
    map.setTileIndexCallback(id, function(sprite, tile) {
      if (tile.alpha == 1) {
        tile.alpha = 0.2;
        layer.dirty = true;
        func();
      }
    }, this);
  }

  this.onHealthHit = function(func) {
    oneTimeAction(ID_HEALTH, func);
  }

  this.getLayer = function() {
    return layer;
  }
}
