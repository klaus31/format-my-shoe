let Helper = function(level) {

  let onAbort = function() {};

  this.preload = function() {
    game.load.image('back', 'game/back.png', 16, 16);
  }

  this.onAbort = function(func) {
    onAbort = func;
  }

  let createMenuBar = function() {
    let menu = game.add.sprite(0, 0);
    menu.fixedToCamera = true;
    const graphics = game.add.graphics(0, 0);
    graphics.beginFill(0x2F003F);
    graphics.drawRect(0, 0, game.width, 30);
    graphics.beginFill(0x000000);
    graphics.drawRect(0, 30, game.width, 2);
    graphics.endFill();
    menu.addChild(graphics);
  }

  let createBackToLevelSelect = function() {
    var back = game.add.sprite(10, 0, 'back');
    back.fixedToCamera = true;
    back.inputEnabled = true;
    back.events.onInputDown.add(onAbort);
  }

  this.create = function() {
    createMenuBar();
    createBackToLevelSelect();
  }
  this.update = function() {}
}