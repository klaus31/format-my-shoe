const Score = function() {
  const ME = this;

  this.msNeeded = function(startTime, endTime) {
    return endTime.getTime() - startTime.getTime();
  }

  this.calculatePoints = function(level, stopsMadeTop) {
    if (!stopsMadeTop) return 1;
    if (stopsMadeTop <= level.getStopsOptimal()) {
      return 3;
    } else if (stopsMadeTop <= level.getStopsGood()) {
      return 2;
    } else {
      return 1;
    }
  }
};