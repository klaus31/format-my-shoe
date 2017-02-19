// FIXME an dieser Stelle wird hart eine größe gecoded, was scheiße ist.
// Daran bin ich bei Stinky am Ende gescheitert!
const levelCtrl = new LevelCtrl();
const game = new Phaser.Game("100%", "100%", Phaser.CANVAS, 'parent');
game.state.add('Startscreen', new Startscreen());
game.state.add('Credits', new Credits());
game.state.add('Game', new Game());
const resultscreen = new Resultscreen();
game.state.add('Resultscreen', resultscreen);
game.state.start('Startscreen'); // FIXME raus
// FIXME rein - in der entwicklung nervt das: game.state.start('Startscreen');