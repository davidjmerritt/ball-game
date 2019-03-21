function createElementFromObj(obj) {
  var element = document.createElement('div');
      element.style.position = 'absolute';
      element.style.display = 'block';
  for (var prop in obj) {
    if (typeof obj[prop] !== 'function') {
      if (prop == 'style') {
        for (var styleProp in obj[prop]) {
          if (Number.isInteger(obj[prop][styleProp])) {
            element[prop][styleProp] = obj[prop][styleProp] + 'px';
          } else {
            element[prop][styleProp] = obj[prop][styleProp];
          }

        }
      } else {
        element[prop] = obj[prop];
      }
    } else {
      if (inArray(['onmousedown','onclick'],prop)) {
        element[prop] = obj[prop];
      }
    }
  }
  return element;
}


function updateElementFromObj(element,obj) {
  for (var prop in obj) {
    if (typeof obj[prop] !== 'function') {
      if (prop == 'style') {
        for (var styleProp in obj[prop]) {
          if (Number.isInteger(obj[prop][styleProp])) {
            element[prop][styleProp] = obj[prop][styleProp] + 'px';
          } else {
            element[prop][styleProp] = obj[prop][styleProp];
          }
        }
      } else {
        element[prop] = obj[prop];
      }
    }
  }
  return element;
}


String.prototype.stripPx = function(){
  return parseInt(this.replace('px'));
};


function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}


function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}


function inArray(arr,item) {
  for (var i=0;i<arr.length;i++) {
    if (arr[i] === item) {
      return true;
      break;
    }
  }
  return false;
}

function removeFromArray(arr,item) {
  var index = arr.indexOf(item);
  arr.splice(index,1);
}


function elementExists(element) {
  if (document.getElementById(element) == null) {
    return false;
  } else {
    return true;
  }
}


function clearAllElementsFromElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}


function playSound(filePath) {
  var audio = new Audio(filePath);
  audio.play();
}
