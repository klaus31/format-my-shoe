var Fonts = {functions : [], ready : false};
var WebFontConfig = {
    active: function() {
      Fonts.ready = true;
      let i = Fonts.functions.length;
      while(i--) Fonts.functions[i]();
  },
    google: {
      families: ['Barrio']
    }
};

const FontCtrl = function() {
  this.loadText = function(func) {
    if(Fonts.ready) {
      func();
    } else {
      Fonts.functions.push(func);
    }
  }
}
