let AddTextImpl = {
  functions: [],
  ready: false
};
var WebFontConfig = {
  active: function() {
    AddTextImpl.ready = true;
    let i = AddTextImpl.functions.length;
    while (i--) AddTextImpl.functions[i]();
    AddTextImpl.functions = [];
  },
  google: {
    families: ['Raleway', 'Baloo']
  }
};

const FontCtrl = function() {
  this.addText = function(x, y, content, style, cb) {
    style = style || {};
    console.info(9879879);
    style.font = 'Droid Sans';
    style.fontWeight = 'bold';
    let addTextInner = function() {
      let text = game.add.text(x, y, content, style);
      text.font = style.font;
      if (cb) cb(text);
    }
    addTextInner();
  }
}
