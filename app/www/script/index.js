// http://phaser.io/tutorials/making-your-first-phaser-game

let game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
let platforms;
const hero = new Hero();

function preload() {
  game.load.image('ground', 'assets/platform2.png');
  game.load.image('gold', 'assets/gold.png');
  cursors = game.input.keyboard.createCursorKeys();
  hero.load(game);
}

function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = "#B0D0FF";

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    let ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    let gold = platforms.create(game.world.width / 2 - 12, 400 - 32, 'gold');

    //  Now let's create two ledges
    let ledge = platforms.create(400, 400, 'ground');

    ledge.body.immovable = true;

    ledge = platforms.create(-150, 250, 'ground');

    ledge.body.immovable = true;

    hero.addToGame(game, 32, game.world.height - 150);
}

function update() {
  hero.update(game, platforms, cursors);
}
