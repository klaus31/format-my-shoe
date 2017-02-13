let Labyrinth = function(hole) {

  const ID_WALL = 1;
  const ID_APPLE = 2;

  let map;
  let layer;
  let healthsEaten = [];

  this.preload = function() {
    console.info('PRELOAD labyrinth')
    game.load.tilemap('map', 'levels/level-01.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('wall', 'levels/wall.png');
    game.load.image('health', 'levels/health.png');
    healthsEaten = [];
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
    map.setTileIndexCallback(ID_APPLE, function(sprite, tile) {
      if (tile.alpha == 1) {
        healthsEaten.push(tile);
        console.info('Warum geht alpha nicht mehr (vgl. 2-3 commits vorher - da gings');
        tile.alpha = 0.2;
        func();
      }
    }, this);
  }

  this.resetApples = function() {
    let i = healthsEaten.length;
    while (i--) healthsEaten[i].alpha = 1;
    healthsEaten = [];
  }

  this.countHealthsEaten = function() {
    return healthsEaten.length;
  }

  this.getLayer = function() {
    return layer;
  }
}