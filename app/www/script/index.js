// FIXME an dieser Stelle wird hart eine größe gecoded, was scheiße ist.
// Daran bin ich bei Stinky am Ende gescheitert!
var game = new Phaser.Game(800, 600, Phaser.CANVAS, '');
game.state.add('Game', new Game());
game.state.start('Game');
