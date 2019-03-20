const appStage        = document.getElementById('appStage');
var ballContainer     = document.createElement('div');
var stageWidth        = 750/2;
var stageHeight       = 1334/2;
var ballColors        = ['#ef9a9a','#81c784','#03a9f4'];
var ballSizeRange     = [10,100];
var numberOfBalls     = 100;
var ballSpeed         = 8;
var ballReleaseInt    = 1000;
var lastBallReleased  = false;

var STATE = 'play';


function init() {
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
      pauseGame();
      clearInterval(intervalId);
    } else {
      if (lastBallReleased == true && !ballContainer.hasChildNodes()) {
        createGameOverScreen();
        gameOverScreenInteraction();
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
      startButton.innerHTML = 'New Game';
  titleScreen.appendChild(startButton);

  appStage.appendChild(titleScreen);
}


function titleScreenInteraction() {
  var titleScreen = document.getElementById('titleScreen');
  var startButton = document.getElementById('startButton');
      startButton.onclick = function() {
          titleScreen.remove();
          startGame();
      }
}


function createGameOverScreen() {
  var titleScreen = document.createElement('div');
      titleScreen.id = 'gameOverScreen';
      titleScreen.className = 'game-over-screen';

  var startButton = document.createElement('button');
      startButton.id = 'restartButton';
      startButton.className = 'start-button';
      startButton.innerHTML = 'Try Again';
  titleScreen.appendChild(startButton);

  appStage.appendChild(titleScreen);
}


function gameOverScreenInteraction() {
  var gameOverScreen = document.getElementById('gameOverScreen');
  var restartButton = document.getElementById('restartButton');
      restartButton.onclick = function() {
          gameOverScreen.remove();
          restartGame();
      }
}


function restartGame() {
    setupBalls();
    appStage.style.cursor = 'crosshair';
    checkForGameOver();
}


function startGame() {
    setupBalls();
    appStage.style.cursor = 'crosshair';
    checkForGameOver();
}


function setupStage() {
  appStage.style.cursor = 'default';
  appStage.style.width = stageWidth + 'px';
  appStage.style.height = stageHeight + 'px';
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

      // var color = ballColors[randomInt(0, ballColors.length-1)];
      // ball.style.backgroundColor = color;

      ball.style.backgroundColor = 'transparent';
      var color = ballColors[randomInt(0, ballColors.length-1)];
      ball.style.border = 'dashed 2px '+color;

      ball.speed = ballSpeed;

  ballContainer.appendChild(ball);
}


function animateBall(_id) {
  var ball = document.getElementById(_id);
  var ballPosY = -100;
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
  ball.onclick = function() {
    if (STATE == 'pause') {} else {
      playSound('snd/LTTP_Enemy_Hit.wav');
      removeBall(_id);
      updateScore(ball.style.width.stripPx());
    }
  }
}


function removeBall(_id) {
  var ball = document.getElementById(_id);
      ball.onclick = function() { return false; }
  // ball.classList.add('flip-horizontal-bck');
  ball.classList.add('jello-horizontal');
  // ball.style.backgroundColor = 'black';
  // ball.style.border = '1px solid black';

  var ballSize = ball.style.width.stripPx();
  var randomDir = randomInt(4,5)/10;

  var intervalId = setInterval(render, 16);
  function render(_id) {
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
  console.log(ballSpeed);
  var slider = document.createElement('div');
      slider.id = 'slidecontainer';
      slider.className = 'slidecontainer';

  var sliderInput = document.createElement('input');
      sliderInput.type = 'range';
      sliderInput.min = -10;
      sliderInput.max = -1;
      sliderInput.value = ballSpeed * -1;
      sliderInput.className = 'slider';
      sliderInput.id = 'slideRange';
      sliderInput.oninput = function() {
        ballSpeed = this.value * -1;
        console.log(ballSpeed);
      }
  slider.appendChild(sliderInput);

  appStage.appendChild(slider);
}


function playSound(filePath) {
  var audio = new Audio(filePath);
  audio.play();
}


function pauseGame() {
  var pauseScreen = document.createElement('div');
      pauseScreen.id = 'pauseScreen';
      pauseScreen.className = 'pause-screen';

    var resumeButton = document.createElement('button');
        resumeButton.id = 'resumeButton';
        resumeButton.className = 'start-button';
        resumeButton.innerHTML = 'Resume';

  pauseScreen.appendChild(resumeButton);
  appStage.appendChild(pauseScreen);

  pauseSreenInteraction();
}


function pauseSreenInteraction() {
  var pauseScreen = document.getElementById('pauseScreen');
  var resumeButton = document.getElementById('resumeButton');
      resumeButton.onclick = function() {
          resumeGame();
      }
}


function resumeGame() {
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
