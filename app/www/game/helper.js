let Helper = function(level, hero) {

  if (!level) throw 'need level';
  if (!hero) throw 'need hero';
  let statistics;
  let onAbort = function() {};
  const fontCtrl = new FontCtrl();
  const FONT_STYLE = {
    fill: '#FFF',
    fontSize: '12pt',
    boundsAlignH: 'center',
    boundsAlignV: 'middle',
    font: 'Baloo'
  };

  this.preload = function() {
    game.load.image('back', 'game/back.png', 16, 16);
  }

  this.onAbort = function(func) {
    onAbort = func;
  }

  let createMenuBar = function() {
    let menu = game.add.sprite(0, 0);
    menu.fixedToCamera = true;
    const graphics = game.add.graphics(0, 0);
    graphics.beginFill(0x2F003F);
    graphics.drawRect(0, 0, game.width, 30);
    graphics.beginFill(0x000000);
    graphics.drawRect(0, 30, game.width, 2);
    graphics.endFill();
    menu.addChild(graphics);
  }

  let createBackToLevelSelect = function() {
    var back = game.add.sprite(10, 0, 'back');
    back.fixedToCamera = true;
    back.inputEnabled = true;
    back.events.onInputDown.add(onAbort);
  }

  let calcStatisticsMessage = function() {
    let stopsOptimal = level.getStopsOptimal();
    let stopsMade = hero.getStopsMade();
    let stopsGood = level.getStopsGood();
    if (stopsMade <= stopsOptimal || stopsGood == stopsOptimal) {
      return stopsMade + ' / ' + stopsOptimal;
    } else {
      return stopsMade + ' / ' + stopsGood;
    }
  }

  let createStatistics = function() {
    fontCtrl.addText(0, 0, calcStatisticsMessage(), FONT_STYLE, function(text) {
      text.fixedToCamera = true;
      text.setTextBounds(0, 0, game.width, 32);
      text.alpha = 1;
      statistics = text;
    });
  }

  this.create = function() {
    createMenuBar();
    createBackToLevelSelect();
    createStatistics();
  }

  let calcStatisticsColor = function() {
    let stopsOptimal = level.getStopsOptimal();
    let stopsGood = level.getStopsGood();
    let stopsMade = hero.getStopsMade();
    if (stopsMade <= stopsOptimal) {
      return '#FFF';
    } else if (stopsMade <= stopsGood) {
      return '#FF0';
    } else {
      return '#F55';
    }
  }
  this.update = function() {
    statistics.text = calcStatisticsMessage();
    statistics.style.fill = calcStatisticsColor();
  }
}
