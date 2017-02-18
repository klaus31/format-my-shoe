let Life = function() {
  let started = false;
  let lifeStepsMade = 0;
  const DEAD_AT_STEPS = 1500;
  this.start = function() {
    started = true;
    lifeStepsMade = 1;
  }
  this.lifeStarted = function() {
    return started;
  }
  this.update = function() {
    if (started) lifeStepsMade++;
  }
  this.getExpectation = function(fullLifeNumber) {
    return fullLifeNumber - (lifeStepsMade / DEAD_AT_STEPS * fullLifeNumber);
  }
  this.isDead = function() {
    return lifeStepsMade >= DEAD_AT_STEPS;
  }
  this.heal = function(percent) {
    lifeStepsMade -= DEAD_AT_STEPS * percent/100;
    if(lifeStepsMade < 0) lifeStepsMade = 0;
  }

}
