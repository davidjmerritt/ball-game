function Button() {
    this.id = guid();
    this.className = 'button';
    this.type = 'static';

    this.style = {

    }

    this.innerHTML = 'Start';

    this.create = function() {
      stage.sprites[this.id] = this;
    }

    this.render = function() {
      if (STATE == 'init') {
        this.innerHTML = 'Start';
        this.style.backgroundColor = '#039be5';
        this.style.color = '#fff';


      } else if (STATE == 'play') {
        this.innerHTML = 'Pause';
        this.style.backgroundColor = '#f8f8f8';
        this.style.color = '#888';

      } else if (STATE == 'pause') {


      } else if (STATE == 'gameover') {

      }
    }

    this.onclick = function() {
      if (STATE == 'init') {
        STATE = 'play';
        createLevel(defaultLevel);
        playSound('snd/LTTP_Get_Key.wav');

      } else if (STATE == 'play') {
        STATE = 'pause';
        this.innerHTML = 'Resume';
        playSound('snd/menuClose.wav');

      } else if (STATE == 'pause') {
        STATE = 'play';
        var domMessage = document.getElementById(message.id);
            domMessage.style.zIndex = '0';
        playSound('snd/menuOpen.wav');

      } else if (STATE == 'gameover') {
        clearAllElementsFromElement(appStage);
        STATE = 'init';
        appLoop = setInterval(update, 1000/60); // 60 FPS
        stage = new Stage();
        level = {};
        controls = new Controls();
        score = new Score();
        button = new Button();
        message = new Message();

        init();
      }
    }

}
