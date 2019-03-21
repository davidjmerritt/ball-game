function Score() {
    this.id = guid();
    this.className = 'score';
    this.type = 'static';
    this.current = 33;
    this.high = 0;

    this.style = {

    }

    this.create = function() {
      stage.sprites[this.id] = this;
    }

    this.render = function() {
      this.innerHTML = '<progress id="progress" max="100" value="'+this.current+'"></progress>';
      if (score.current >= 50 && score.current < 100) {
          document.getElementById('progress').classList.add('mid-score');
      } else if (score.current >= 100) {
          document.getElementById('progress').classList.add('high-score');
      }
    }
}
