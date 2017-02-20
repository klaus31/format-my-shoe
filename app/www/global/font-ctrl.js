var AddTextImpl = {
  functions: [],
  ready: false
};
var WebFontConfig = {
  active: function() {
    AddTextImpl.ready = true;
    let i = AddTextImpl.functions.length;
    while (i--) AddTextImpl.functions[i]();
  },
  google: {
    families: ['Barrio']
  }
};

const FontCtrl = function() {
  this.addText = function(x, y, content, style, cb, font) {
    font = font || 'Barrio';
    style = style || {};
    let addTextInner = function() {
      let text = game.add.text(x, y, content, style);
      text.font = font;
      if (cb) cb(text);
    }
    if (AddTextImpl.ready) {
      addTextInner();
    } else {
      AddTextImpl.functions.push(addTextInner);
    }
  }
}