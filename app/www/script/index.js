// http://phaser.io/tutorials/making-your-first-phaser-game

let game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
let platforms;

const hero = new Hero();
const rank = new Rank();

function preload() {
  game.load.image('ground', 'assets/ground.png');
  game.load.image('ledge', 'assets/ledge.png');
  cursors = game.input.keyboard.createCursorKeys();

  hero.load(game);
  rank.load(game);
}

function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = "#90B0FF";

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Add some fance plants
    rank.addToGroup(platforms, game.world.width - 64,  game.world.height - 160, 2);
    rank.addToGroup(platforms, 0,  game.world.height - 160, 3);

    // Here we create the ground.
    let ground = platforms.create(0, game.world.height - 64, 'ground');

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    // Create a secound ground safe dude from falling down
    ground = platforms.create(425, game.world.height - 64, 'ground');

    ground.body.immovable = true;

    //  Now let's create two ledges
    let ledge = platforms.create(400, 340, 'ledge');

    ledge.body.immovable = true;

    ledge = platforms.create(500, 100, 'ledge');

    ledge.body.immovable = true;

    ledge = platforms.create(-150, 200, 'ledge');

    ledge.body.immovable = true;

    hero.addToGame(game, 32, game.world.height - 150);
}

function update() {
  hero.update(game, platforms, cursors);
}
