// FIXME an dieser Stelle wird hart eine größe gecoded, was scheiße ist.
// Daran bin ich bei Stinky am Ende gescheitert!
let game = new Phaser.Game(16 * 50, 16 * 29, Phaser.CANVAS, '');
game.state.add('Game', new Game());
game.state.start('Game');