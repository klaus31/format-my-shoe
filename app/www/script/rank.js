let Rank = function() {

  const keyPart1 = 'rank1-' + Util.createRandomString();
  const keyPart2 = 'rank2-' + Util.createRandomString();
  const keyPart3 = 'rank3-' + Util.createRandomString();
  const partHeight = 96;

  this.load = function(game) {
    game.load.image(keyPart1, 'assets/rank1.png');
    game.load.image(keyPart2, 'assets/rank2.png');
    game.load.image(keyPart3, 'assets/rank3.png');
  }

  this.addToGroup = function(group, x, y, unitsHeight) {
    while(unitsHeight--) {
      var rank = group.create(x, y, [keyPart1, keyPart2, keyPart3][unitsHeight%3]);
      rank.body.immovable = true;
      y -= partHeight;
    }
  }
}
