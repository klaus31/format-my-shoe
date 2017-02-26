let Labyrinth = function(levelInfo) {

  const ID_WALL = 1;
  const ID_HEALTH = 2;
  const ID_GOAL = 3;

  let map;
  let layer;
  let sounds = {};
  this.preload = function() {
    game.load.tilemap('map', 'game/levels/' + levelCtrl.getCurrentLevel().getName() + '.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('wall', 'game/levels/wall.png');
    game.load.image('health', 'game/levels/health.png');
    game.load.image('goal', 'game/levels/goal.png');
    game.load.audio('sound-goal', 'game/goal.mp3');
    game.load.audio('sound-health', 'game/health.mp3');
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
    sounds.goal = game.add.audio('sound-goal');
    sounds.health = game.add.audio('sound-health');
  }

  this.onGoalHit = function(func) {
    let cb = function(a, b) {
      if (GlobalConfig.isSoundOn()) sounds.goal.play();
      func(a, b);
    }
    map.setTileIndexCallback(ID_GOAL, cb);
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
    let cb = function(a, b) {
      if (GlobalConfig.isSoundOn()) sounds.health.play();
      func(a, b);
    }
    oneTimeAction(ID_HEALTH, cb);
  }

  this.getLayer = function() {
    return layer;
  }
}
