// get me a chance to create levels
// activate with localStorage.setItem('debug', 'true')
// set version for db migration reasons
const debugMode = localStorage.getItem('debug') === 'true';
if (localStorage.getItem('version') == null) {
  localStorage.clear();
}
if (localStorage.getItem('version') == '201702201824') {
  localStorage.clear();
}
if (localStorage.getItem('version') - 0 < 1703061906) {
  localStorage.clear();
  if (debugMode) localStorage.setItem('debug', 'true');
}
localStorage.setItem('version', 1703061906);

const levelCtrl = new LevelCtrl();
const game = new Phaser.Game("100%", "100%", Phaser.CANVAS, 'parent');

let setGlobalScalingRules = function() {
  game.scale.onOrientationChange.addOnce(function() {
    // TODO does not work in safari ios (and other ...?!
  // Alternative: game.scale.setGameSize(screen.width, screen.height);
    game.scale.setExactFit();
    game.scale.refresh();
  });
}



const resultscreen = new Resultscreen();
game.state.add('Startscreen', new Startscreen());
game.state.add('Credits', new Credits());
game.state.add('Game', new Game());
game.state.add('Resultscreen', resultscreen);
game.state.start('Startscreen');

if (debugMode) {
  console.info('Debug-Mode activated:');
  console.info('* will unlock all levels because of debug mode');
  console.info('* will output statistics and level building help');
}
