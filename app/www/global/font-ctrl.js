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
    style.font = style.font || 'Raleway';
    let addTextInner = function() {
      let text = game.add.text(x, y, content, style);
      text.font = style.font;
      if (cb) cb(text);
    }
    if (AddTextImpl.ready) {
      addTextInner();
    } else {
      AddTextImpl.functions.push(addTextInner);
    }
  }
}
