function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max)+1;
  return Math.floor(Math.random() * (max - min)) + min;
}


String.prototype.stripPx = function(){
  return parseInt(this.replace('px'));
};