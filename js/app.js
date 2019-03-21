var appLoop = setInterval(update, 1000/60); // 60 FPS


var STATE = 'init';


var stage = new Stage();
var level = {};
var controls = new Controls();
var score = new Score();
var button = new Button();
var message = new Message();


function init() {
  setup();
  update();
}


function setup() {
  controls.create();
  score.create();
  button.create();
  message.create();
  stage.create();
}


function update() {
  if (STATE == 'init') {

  } else if (STATE == 'play') {
      stage.render();
      appStage.style.cursor = 'crosshair';

      if (score.current < 0) {
      // if (level.missedBalls.length >= ballsMissedMax) {
        gameOver();
      } else if (level.missedBalls.length + level.capturedBalls.length == level.numberOfBalls) {
        nextLevel();
      }
  } else if (STATE == 'pause') {
      pauseGame();
  }
}


function pauseGame() {
  console.log('Paused');
  appStage.style.cursor = 'default';
  var domMessage = document.getElementById(message.id);
      domMessage.innerHTML = '<h1>Paused</h1>';
      domMessage.style.zIndex = '9999';
}


function createLevel(currentLevel) {
  level = {};
  level = new Level();
  level.number = currentLevel + 1;
  level.numberOfBalls = 0;
  level.capturedBalls = [];
  level.missedBalls = [];
  level.create();
  console.log('Level '+level.number);
  stage.create();
}


function nextLevel() {
  console.log('Level Clear');
  clearInterval(appLoop);
  createLevel(level.number);
  appLoop = setInterval(update, 1000/60);
}


function gameOver() {
  STATE = 'gameover';
  appStage.style.cursor = 'default';
  var domButton = document.getElementById(button.id);
      domButton.innerHTML = 'Try Again';
      domButton.style.backgroundColor = '#039be5';
      domButton.style.color = '#fff';
  var domMessage = document.getElementById(message.id);
      domMessage.innerHTML = gameOverMessage(level.number);
      domMessage.style.zIndex = '9999';
  console.log('Game Over');
  clearInterval(appLoop);
}
