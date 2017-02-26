const Score = function() {
  const ME = this;
  this.msNeeded = function(startTime, endTime) {
    return endTime.getTime() - startTime.getTime();
  }
  this.calculatePoints = function(msNeeded, levelTopTime) {
    if (msNeeded <= levelTopTime * 1.05) {
      return 3;
    } else if (msNeeded <= levelTopTime * 1.3) {
      return 2;
    } else {
      return 1;
    }
  }
};