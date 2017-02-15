const Levels = [{
  name: 'intro-very-first'
}, {
  name: 'intro-health-heart'
}, {
  name: 'small-labyrinth'
}, {
  name: 'long-ways-to-go'
}, {
  name: 'intro-pause'
}, {
  name: 'intro-speed'
}, {
  name: 'rain'
}];
const GameProperties = {
  width: 16 * 50,
  height: 16 * 29,
  currentLevel: 0,
  style: {
    backgroundColor: '#000',
    font: {
      h1: {
        fontSize: '32px',
        fill: '#FFF',
        font: 'Courier'
      },
      text: {
        fontSize: '16px',
        fill: '#FFF',
        font: 'Courier'
      }
    }
  }
};
