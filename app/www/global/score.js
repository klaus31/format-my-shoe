// TODO there is no correct way for scoring yet ...
const Score = function(startTime, endTime) {
  this.calculatePoints = function() {
    let ms = endTime.getTime() - startTime.getTime();
    if (ms < 10 * 1000) {
      return 3;
    } else if (ms < 20 * 1000) {
      return 2;
    } else {
      return 1;
    }
  }
};