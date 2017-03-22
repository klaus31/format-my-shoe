let Helper = function(level, hero) {

  if (!level) throw 'need level';
  if (!hero) throw 'need hero';
  let statistics;
  let onAbort = function() {};
  const fontCtrl = new FontCtrl();
  const FONT_STYLE = {
    fill: hex(Style.colors.complement.b),
    fontSize: '12pt',
    boundsAlignH: 'center',
    boundsAlignV: 'middle'
  };
  const FONT_STYLE_BACK = {
    fill: FONT_STYLE.fill,
    fontSize: '18pt',
    boundsAlignH: 'center',
    boundsAlignV: 'middle'
  };

  this.preload = function() {
  }

  this.onAbort = function(func) {
    onAbort = func;
  }

  let createMenuBar = function() {
    let menu = game.add.sprite(0, 0);
    menu.fixedToCamera = true;
    const graphics = game.add.graphics(0, 0);
    graphics.beginFill(Style.colors.primary.d);
    graphics.drawRect(0, 0, game.width, 30);
    graphics.beginFill(Style.colors.primary.f);
    graphics.drawRect(0, 30, game.width, 2);
    graphics.endFill();
    menu.addChild(graphics);
  }

  let createBackToLevelSelect = function() {
    var back = game.add.sprite(0,0);
    back.fixedToCamera = true;
    back.inputEnabled = true;
    back.events.onInputDown.add(onAbort);
    fontCtrl.addText(0, 0, '<', FONT_STYLE_BACK, function(text) {
      text.setTextBounds(0, 0, 32, 32);
      text.alpha = 1;
      back.addChild(text);
    });
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
      return hex(Style.colors.complement.b);
    } else if (stopsMade <= stopsGood) {
      return hex(Style.colors.complement.c);
    } else {
      return hex(Style.colors.complement.d);
    }
  }
  this.update = function() {
    statistics.text = calcStatisticsMessage();
    statistics.style.fill = calcStatisticsColor();
  }
}
