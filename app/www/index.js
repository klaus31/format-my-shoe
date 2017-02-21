// set version for db migration reasons
if (localStorage.getItem('version') == null) {
  localStorage.clear();
}
localStorage.setItem('version', '201702201824');


const levelCtrl = new LevelCtrl();
const game = new Phaser.Game("100%", "100%", Phaser.CANVAS, 'parent');

let setGlobalScalingRules = function() {
  game.scale.forcePortrait = true;
}
const resultscreen = new Resultscreen();
game.state.add('Startscreen', new Startscreen());
game.state.add('Credits', new Credits());
game.state.add('Game', new Game());
game.state.add('Resultscreen', resultscreen);
game.state.start('Startscreen'); // FIXME raus
// FIXME rein - in der entwicklung nervt das: game.state.start('Startscreen');