// FIXME an dieser Stelle wird hart eine größe gecoded, was scheiße ist.
// Daran bin ich bei Stinky am Ende gescheitert!
let game = new Phaser.Game(GameProperties.width, GameProperties.height, Phaser.CANVAS, '');
game.state.add('Startscreen', new Startscreen());
game.state.add('Game', new Game());
const resultscreen = new Resultscreen();
game.state.add('Resultscreen', resultscreen);
game.state.start('Startscreen');
