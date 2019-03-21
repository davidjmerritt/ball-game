function Message() {
    this.id = guid();
    this.className = 'message';
    this.type = 'static';
    this.innerHTML = '<h1>Click <b>Start</b> to play</h1><p>Don\'t let your <b>Life Bar</b> deplete or it\'s <br />game over!</p>';

    this.style = {

    }

    this.create = function() {
      stage.sprites[this.id] = this;
    }

    this.render = function() {
      this.innerHTML = '<h2>Level ' + level.number +'</h2>' ;
    }
}


function gameOverMessage(level) {
  if (level < 3) {
    return '<h1><b>Oh No!</b></h1><p><b>Level '+level+'</b><br /><br />Ganbare! You can do it.</p>';
  } else if (level >= 3 && level < 5) {
    return '<h1><b>It\'s All Over</b></h1><p><b>Level '+level+'</b><br /><br />C\'mon you can do better than that, right?</p>';
  } else if (level >= 5 && level < 7) {
    return '<h1><b>Perhaps This Time...</b></h1><p><b>Level '+level+'</b><br /><br />Wow! Your getting serious now. Think you can take it to the limit?</p>';
  } else if (level >= 7 && level < 10) {
    return '<h1><b>Shazam!</b></h1><p><b>Level '+level+'</b><br /><br />Everyone clear out there is a professional here in the house!</p>';
  } else if (level >= 10 && level < 12) {
    return '<h1><b>Oh My Goshimasu!</b></h1><p><b>Level '+level+'</b><br /><br />Pretty good... pretty, pretty, pretty, pretty good.</p>';
  } else if (level >= 12 && level < 15) {
    return '<h1><b>Kazaaa!</b></h1><p><b>Level '+level+'</b><br /><br />Color me impressed. You are now a true master of the game!</p>';
  } else if (level >= 15) {
    return '<h1><b>Hmm.../b></h1><p><b>Level '+level+'</b><br /><br />Ok you must have hacked the game... and for that I tip my hat to you.</p>';
  }
}
