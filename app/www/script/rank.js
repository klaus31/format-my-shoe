let Rank = function() {

  const keyPart1 = 'rank1-' + Util.createRandomString();
  const keyPart2 = 'rank2-' + Util.createRandomString();
  const keyPart3 = 'rank3-' + Util.createRandomString();
  const gridHeightOfPart = 3;

  this.load = function(game) {
    game.load.image(keyPart1, 'assets/rank1.png');
    game.load.image(keyPart2, 'assets/rank2.png');
    game.load.image(keyPart3, 'assets/rank3.png');
  }

  this.addToGroup = function(group, grid, unitsHeight) {
    while (unitsHeight--) {
      var rank = group.create(grid.getXPx(), grid.getYPx(), [keyPart1, keyPart2, keyPart3][unitsHeight % 3]);
      rank.body.immovable = true;
      grid.y -= gridHeightOfPart;
    }
  }
}
