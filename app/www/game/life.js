let Life = function() {
  let started = false;
  let lifeStepsMade = false;
  const DEAD_AT_STEPS = 640;
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

}