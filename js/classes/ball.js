function Ball() {
    this.id = guid();
    this.className = 'ball';
    this.type = 'dynamic';

    this.style = {
      width: 10,
      height: 10,
      left: 0,
      top: -100,
      backgroundColor: ballColors[randomInt(0,ballColors.length)],
    }

    this.dir = 'DOWN';
    this.speed = 1;

    this.points = 1;
    this.damage = 1;

    this.edges = function() {
      if (this.style.top >= stageHeight) {
        level.missBall(this);
        stage.remove(this.id);
      }
    }

    this.onmousedown = function() {
      level.captureBall(this);
      stage.remove(this.id);
    }

    this.create = function() {
      stage.sprites.push(this);
    }

    this.update = function() {
      stage.sprites[this.id] = this;
    }

    this.move = function() {
      if (this.dir == 'DOWN') {
        this.style.top += this.speed;
      }
    }

    this.render = function() {
      this.move();
      this.edges();
    }
}
