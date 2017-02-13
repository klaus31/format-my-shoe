const GameProperties = {
  width: 16 * 50,
  height: 16 * 29,
  currentLevel: 1,
  allLevels: 4,
  style: {
    backgroundColor: '#000',
    font: {
      h1: {
        fontSize: '32px',
        fill: '#FFF',
        font: 'Courier'
      },
      text: {
        fontSize: '16px',
        fill: '#FFF',
        font: 'Courier'
      }
    }
  }
};
// FIXME an dieser Stelle wird hart eine größe gecoded, was scheiße ist.
// Daran bin ich bei Stinky am Ende gescheitert!
let game = new Phaser.Game(GameProperties.width, GameProperties.height, Phaser.CANVAS, '');
game.state.add('Startscreen', new Startscreen());
game.state.add('Game', new Game());
const resultscreen = new Resultscreen();
game.state.add('Resultscreen', resultscreen);
game.state.start('Startscreen');
