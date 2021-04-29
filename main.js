'use strict';

const square = document.querySelector('.square');
const URL_API = 'https://keev.me/f/slowpoke.php';
let start = Date.now();

let promise = new Promise(function(resolve) {
  square.style.width = '100px';
  square.style.height = '100px';

  setTimeout(function go(){
    let timePassed = Date.now() - start;

    if (timePassed >= 2000) {
      clearTimeout(timePassed);
      return;
    }

    draw(timePassed);
    setTimeout(go, 1000);

    resolve();
  }, 1000);
});

function draw(timePassed) {
  let size = Math.floor(timePassed / 10);

  square.style.left = size + 'px';
}

promise.then(() => {
  return fetch(URL_API)
    .then(response => response.text())
    .then(res => {
      if(res === '1') {
        square.style.backgroundColor = 'green';
      } else if(res === '0') {
        square.style.backgroundColor = 'blue';
      } else {
        square.style.backgroundColor = 'black';
      }
    }).catch(() => square.style.backgroundColor = 'red');
});

