const appStage = document.getElementById('appStage');
      appStage.style.width = stageWidth + 'px';
      appStage.style.height = stageHeight + 'px';


function Stage() {
  this.sprites = [];

  this.create = function() {
    for (var i in this.sprites) {
      var sprite = this.sprites[i];
      if (!elementExists(sprite.id)) {
        var element = createElementFromObj(sprite);
        appStage.appendChild(element);
      }
    }
  }


  this.render = function() {
    if (!isEmpty(this.sprites)) {
      for (var i in this.sprites) {
        var sprite = this.sprites[i];
        if (sprite !== undefined) {
          try {
            var element = document.getElementById(sprite.id);
            updateElementFromObj(element,sprite);
            sprite.render();
          } catch(error) {
            // console.error(error);
          }
        }
      }
    }
  }


  this.remove = function(_id) {
    for (var i in this.sprites) {
      if (this.sprites[i].id == _id) {
        removeFromArray(this.sprites,this.sprites[i]);
        document.getElementById(_id).remove();
        break;
      }
    }
  }
}
