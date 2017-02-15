// FIXME an dieser Stelle wird hart eine größe gecoded, was scheiße ist.
// Daran bin ich bei Stinky am Ende gescheitert!
const dao = new Dao();
const dimensions = new Dimensions();
const game = new Phaser.Game(dimensions.getWidth(), dimensions.getHeight(), Phaser.CANVAS, '');
game.state.add('Startscreen', new Startscreen());
game.state.add('Game', new Game());
const resultscreen = new Resultscreen();
game.state.add('Resultscreen', resultscreen);
game.state.start('Startscreen');
