const appStage        = document.getElementById('appStage');
var ballContainer     = document.createElement('div');
var stageWidth        = 750/2;
var stageHeight       = 1334/2;
var ballColors        = ['#ef9a9a','#81c784','#03a9f4'];
var ballSizeRange     = [10,100];
var numberOfBalls     = 5;
var ballSpeed         = 10;
var ballReleaseInt    = 1000;
var lastBallReleased  = false;


var STATE = 'init';


function init() {
  createHud();
  setupStage();
  createTitleScreen();
  titleScreenInteraction();
  score();
  speedController();
  keyBoardControls();
}


function checkForGameOver() {
  var intervalId = setInterval(render, 16);
  function render() {
    if (STATE == 'pause') {
      clearInterval(intervalId);
    } else {
      if (lastBallReleased == true && !ballContainer.hasChildNodes()) {
        STATE = 'gameover';
        gameOver();
        clearInterval(intervalId);
      }
    }
  }
}


function createTitleScreen() {
  var titleScreen = document.createElement('div');
      titleScreen.id = 'titleScreen';
      titleScreen.className = 'title-screen';

  var startButton = document.createElement('button');
      startButton.id = 'startButton';
      startButton.className = 'start-button';
      startButton.innerHTML = 'Start';
  titleScreen.appendChild(startButton);

  appStage.appendChild(titleScreen);
}


function titleScreenInteraction() {
  var titleScreen = document.getElementById('titleScreen');
  var startButton = document.getElementById('startButton');
      startButton.onclick = function() {
          // titleScreen.remove();
          // console.log(STATE)
          if (STATE == 'init') {
            startGame();
          } else if (STATE == 'pause') {
            resumeGame();
          } else if (STATE == 'play') {
            pauseGame();
          } else if (STATE == 'gameover') {
            startGame();
          }
      }
}


function gameOver() {
  var startButton = document.getElementById('startButton');
      startButton.innerHTML = 'Play Again';
      startButton.style.backgroundColor = '#039be5';
      startButton.style.color = '#fff';
}


function startGame() {
    STATE = 'play';
    setupBalls();
    appStage.style.cursor = 'crosshair';
    checkForGameOver();
    var score = document.getElementById('score');
        score.innerHTML = 0;
    var startButton = document.getElementById('startButton');
        startButton.innerHTML = 'Pause';
        startButton.style.backgroundColor = '#fff';
        startButton.style.color = '#444';
}


function setupStage() {
  appStage.style.cursor = 'default';
  appStage.style.width = stageWidth + 'px';
  appStage.style.height = stageHeight + 'px';
}


function createHud() {
  var hud = document.createElement('div');
      hud.id = 'hud';
      hud.className = 'hud';
  appStage.appendChild(hud);
}


function setupBalls() {
  ballContainer.id = 'ballContainer';
  ballContainer.className = 'ball-container';
  appStage.appendChild(ballContainer);

  lastBallReleased = false;

  var _id = 0;
  var intervalId = setInterval(render, ballReleaseInt);
  function render() {
    if (STATE == 'pause') {} else {
      // console.log(_id,numberOfBalls)
      if (_id >= numberOfBalls) {
        // console.log('Ball Drop Stop');
        lastBallReleased = true;
        clearInterval(intervalId);
      } else {
        // console.log('releaseBall '+_id)
        createBall(_id);
        animateBall(_id);
        ballInteraction(_id);
      }
      _id += 1;
    }
  }
}

function createBall(_id) {
  var ball = document.createElement('div');
      ball.id = _id;
      ball.className = 'ball';

      var ballSize = randomInt(ballSizeRange[0], ballSizeRange[1]);
      ball.style.width = ballSize+'px';
      ball.style.height = ballSize+'px';

      var ballPosX = randomInt(ballSize, stageWidth-ballSize);
      ball.style.left = (ballPosX-ballSize/2)+'px';

      var ballPosY = -ballSize;
      ball.style.top =  ballPosY+'px';

      var color = ballColors[randomInt(0, ballColors.length-1)];
      ball.style.backgroundColor = color;

      // ball.style.backgroundColor = 'transparent';
      // var color = ballColors[randomInt(0, ballColors.length-1)];
      // ball.style.border = 'dashed 2px '+color;

      ball.speed = ballSpeed;

  ballContainer.appendChild(ball);
}


function animateBall(_id) {
  var ball = document.getElementById(_id);
  var ballPosY = 0;
  var intervalId = setInterval(render, ball.speed);
  function render() {
    if (STATE == 'pause') {} else {
      if (ballPosY == stageHeight) {
        ball.remove();
        clearInterval(intervalId);
      } else {
        ballPosY++;
        ball.style.top = ballPosY + 'px';
      }
    }
  }
}


function ballInteraction(_id) {
  var ball = document.getElementById(_id);
  ball.onmousedown = function() {
    if (STATE == 'pause') {} else {
      removeBall(_id);
      updateScore(ball.style.width.stripPx());
    }
  }
}


function removeBall(_id) {
  var ball = document.getElementById(_id);
      ball.onmousedown = function() { return false; }
  // ball.classList.add('flip-horizontal-bck');
  ball.classList.add('jello-horizontal');
  // ball.style.content.stripPx()+' points';
  // ball.style.backgroundColor = 'black';
  // ball.style.border = '1px solid black';

  var ballSize = ball.style.width.stripPx();
  var randomDir = randomInt(4,5)/10;

  var intervalId = setInterval(render, 16);
  playSound('snd/LTTP_Enemy_Hit.wav');
  function render(_id) {
    if (STATE == 'play') {
      if (ballSize <= 0) {
        ball.remove();
        clearInterval(intervalId);
      } else {
        ballSize--;
        ball.style.width = ballSize + 'px';
        ball.style.height = ballSize + 'px';

        var ballPosX = Math.round(ball.style.left.stripPx() + randomDir);
        ball.style.left = ballPosX  + 'px';
      }
    }
  }
}


function score() {
  var score = document.createElement('div');
      score.id = 'score';
      score.className = 'score';
      score.innerHTML = 0;

  appStage.appendChild(score);
}


function updateScore(ballWidth) {
  var score = document.getElementById('score');
      score.innerHTML = score.innerHTML.stripPx() + createPointsFromBallWidth(ballWidth);
}


function createPointsFromBallWidth(ballWidth) {
  var points = 0;
  if (ballWidth >= 90) {
    points = 1;
  } else if (ballWidth >= 80) {
    points = 2;
  } else if (ballWidth >= 70) {
    points = 3;
  } else if (ballWidth >= 60) {
    points = 4;
  } else if (ballWidth >= 50) {
    points = 5;
  } else if (ballWidth >= 40) {
    points = 6;
  } else if (ballWidth >= 30) {
    points = 7;
  } else if (ballWidth >= 20) {
    points = 8;
  } else if (ballWidth >= 10) {
    points = 9;
  } else if (ballWidth >= 0) {
    points = 10;
  }
  return points;
}

function speedController() {
  // console.log(ballSpeed);
  var slider = document.createElement('div');
      slider.id = 'slidecontainer';
      slider.className = 'slidecontainer';
      slider.style.width = (stageWidth - 60) + 'px';

  var sliderInput = document.createElement('input');
      sliderInput.type = 'range';
      sliderInput.min = -100;
      sliderInput.max = -10;
      sliderInput.value = ballSpeed * -1;
      sliderInput.className = 'slider';
      sliderInput.id = 'slideRange';
      sliderInput.oninput = function() {
        ballSpeed = this.value * -1;
        // console.log(ballSpeed);
      }
  slider.appendChild(sliderInput);

  appStage.appendChild(slider);
}


function playSound(filePath) {
  var audio = new Audio(filePath);
  audio.play();
}


function pauseGame() {
  STATE = 'pause';
  var startButton = document.getElementById('startButton');
      startButton.innerHTML = 'Resume';
      startButton.style.backgroundColor = '#039be5';
      startButton.style.color = '#fff';
  var pauseScreen = document.createElement('div');
      pauseScreen.id = 'pauseScreen';
      pauseScreen.className = 'pause-screen';

  appStage.appendChild(pauseScreen);

}


function resumeGame() {
  var startButton = document.getElementById('startButton');
      startButton.innerHTML = 'Pause';
      startButton.style.backgroundColor = '#fff';
      startButton.style.color = '#444';
  var pauseScreen = document.getElementById('pauseScreen');
      pauseScreen.remove();
  STATE = 'play';
  checkForGameOver();
}


function keyBoardControls() {
  document.body.onkeyup = function(e){
    if (e.keyCode == 32) {
      if (STATE == 'pause') {
        resumeGame();
      } else {
        STATE = 'pause';
      }
    }
  }
}
