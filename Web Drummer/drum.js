function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
}

function playSequence() {
  document.getElementById("clickMe"); //click()
  console.log("ive been clicked");
  var interval = 250; // ms
  var counter = 0;
  var keyArray = [65, 72, 68, 72,
                  83, 72, 65, 83,
                  65, 72, 68, 72,
                  68, 72, 68  ];
    // var keyArray = [65, 72, 68, 72, 83, 72,  65, 83, 68, 72 ];
  var promise = Promise.resolve();

  keyArray.forEach(function (el) {
    promise = promise.then(function () {
      console.log(el);
      return new Promise(function (resolve) {
        setTimeout(resolve, interval);
        const seq = document.querySelector(`audio[data-key="${el}"]`);
        const key = document.querySelector(`div[data-key="${el}"]`);
        if (!seq) return;

        key.classList.add('playing');
        seq.currentTime = 0;
        seq.play();
      });
    });
  });

  promise.then(function () {
    console.log('Loop finished.');
  });

}

function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
  if (!audio) return;

  key.classList.add('playing');
  audio.currentTime = 0;
  audio.play();
}

const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);
