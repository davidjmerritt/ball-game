function Controls() {
    this.id = guid();
    this.className = 'controls';
    this.type = 'static';

    this.style = {

    }

    this.create = function() {
      stage.sprites[this.id] = this;
    }

    this.render = function() {
      this.innerHTML = '';
    }

}
