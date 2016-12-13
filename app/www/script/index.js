let gridLayout = new GridLayout();
let game = new Phaser.Game(gridLayout.getDisplayWidth(), gridLayout.getDisplayHeight(), Phaser.CANVAS, '');
game.state.add('Game', new Game(gridLayout));
game.state.start('Game');