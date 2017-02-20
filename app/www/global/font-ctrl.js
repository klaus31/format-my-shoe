// TODO aufräumen!!!
var loadTexts = [];
var WebFontConfigActive = false;
var WebFontConfig = {
    active: function() {
      WebFontConfigActive = true;
      let i = loadTexts.length;
      while(i--) loadTexts[i]();
  },
    google: {
      families: ['Barrio']
    }
};

const FontCtrl = function() {
  let interval = window.setTimeout(loadTexts, 30);
  this.loadText = function(func) {
    if(WebFontConfigActive) {
      func();
    } else {
      loadTexts.push(func);
    }
  }
}
