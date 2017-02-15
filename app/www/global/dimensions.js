const Dimensions = function() {
  const ME = this;
  this.getWidth = function(){ return 16 * 50;};
  this.getHeight = function(){ return 16 * 29;}
  this.getCenterX = function(){ return ME.getWidth() / 2;}
  this.getCenterY = function(){ return ME.getHeight() / 2;}
};
