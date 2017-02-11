// FIXME an dieser Stelle wird hart eine größe gecoded, was scheiße ist.
// Daran bin ich bei Stinky am Ende gescheitert!
const GameData = {
  width: 16 * 50,
  height: 16 * 29
}
let game = new Phaser.Game(GameData.width, GameData.height, Phaser.CANVAS, '');
game.state.add('Game', new Game());
game.state.start('Game');