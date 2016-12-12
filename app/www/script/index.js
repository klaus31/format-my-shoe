// http://phaser.io/tutorials/making-your-first-phaser-game

let game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
let platforms;
const hero = new Hero();

function preload() {
  game.load.image('ground', 'assets/ground.png');
  game.load.image('ledge', 'assets/ledge.png');
  game.load.image('rank1', 'assets/rank1.png');
  game.load.image('rank2', 'assets/rank2.png');
  game.load.image('rank3', 'assets/rank3.png');
  cursors = game.input.keyboard.createCursorKeys();
  hero.load(game);
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
    let rank = platforms.create(game.world.width - 64, game.world.height - 256, 'rank1');
    rank.body.immovable = true;
    rank = platforms.create(game.world.width - 64,  game.world.height - 160, 'rank2');
    rank.body.immovable = true;
    rank = platforms.create(0,  game.world.height - 160, 'rank3');
    rank.body.immovable = true;
    rank = platforms.create(0, game.world.height - 256, 'rank2');
    rank.body.immovable = true;
    rank = platforms.create(0, game.world.height - 352, 'rank1');
    rank.body.immovable = true;

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
