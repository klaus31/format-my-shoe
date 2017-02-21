let Startscreen = function() {

  this.preload = function() {
    game.stage.backgroundColor = '#000';
    game.load.image('splash', 'splash/splash.png');
    setGlobalScalingRules();
  }

  this.create = function() {
    game.add.image(game.width / 2 - 217, game.height / 2 - 230, 'splash');
    window.setTimeout(startgame, 3000);
  }

  let startgame = function() {
    game.camera.onFadeComplete.addOnce(function() {
      game.state.start('Resultscreen');
    });
    game.camera.fade(0x5B1075);
  }

  this.update = function() {}
}