function Level() {
  this.id = guid();
  this.number = 0;
  this.numberOfBalls = 0;
  this.capturedBalls = [];
  this.missedBalls = [];

  this.create = function() {
    this.createBalls();
  }

  this.missBall = function(ball) {
    this.missedBalls.push(ball.id);
    // console.log('Missed! '+ball.id);
    score.current -= ball.points;
    playSound('snd/LTTP_Link_Hurt.wav');
  }

  this.captureBall = function(ball) {
    playSound('snd/LOZ_Get_Heart.wav');
    if (score.current >= 100) {
      score.current = 100;
      playSound('snd/LTTP_Get_Key.wav');
    } else {
      score.current += ball.points;
    }
    this.capturedBalls.push(ball.id);
  }

  this.createBalls = function() {
    this.numberOfBalls = numberOfBallsMin * this.number;
    var speed = this.number * ballSpeedFactor;
    for (var i=0;i<this.numberOfBalls;i++) {
      var size = Math.round(randomInt(ballSizeRange[0],ballSizeRange[1]));
      var ball = new Ball();
          ball.style.width = size;
          ball.style.height = size;
          ball.style.left = randomInt(0,stageWidth-size);
          ball.style.top = (i+1) * -100;
          ball.speed = speed;
          ball.points = Math.round(1/size*100);
          ball.damage = size;
      ball.create();
    }
  }
}
