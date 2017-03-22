let Startscreen = function() {

  this.preload = function() {
    game.stage.backgroundColor = Style.colors.primary.d;
    game.load.image('splash', 'splash/splash.png');
    setGlobalScalingRules();
  }

  this.create = function() {
    game.add.image(game.width / 2 - 150, game.height / 2 - 200, 'splash');
    window.setTimeout(startgame, 3000);
  }

  let startgame = function() {
    game.camera.onFadeComplete.addOnce(function() {
      game.state.start('Resultscreen');
    });
    game.camera.fade(Style.colors.primary.e);
  }

  this.update = function() {}
}
