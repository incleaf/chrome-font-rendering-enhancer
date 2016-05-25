(function() {
  chrome.storage.sync.get([
    'webkitTextStroke'
  ], function(items) {
    var savedValue = items.webkitTextStroke || 25;
    var slider = document.getElementById('slider');
    var resetBtn = document.getElementById('resetBtn');
    var doneBtn = document.getElementById('doneBtn');
    var isSliding;

    noUiSlider.create(slider, {
      start: savedValue,
      connect: "lower",
      pips: {
        mode: 'values',
        values: [0, 10, 20, 30, 40, 50],
        density: 4
      },
      range: {
        min: 0,
        max: 50
      }
    });

    slider.noUiSlider.on('update', function() {
      if (isSliding) {
        clearInterval(isSliding);
      }
      isSliding = setTimeout(function() {
        chrome.storage.sync.set({
          webkitTextStroke: slider.noUiSlider.get()
        }, function() {
          chrome.tabs.executeScript({
            file: 'inject.js'
          });
          isSliding = null;
        });
      }, 100);
    });

    resetBtn.addEventListener('click', function() {
      slider.noUiSlider.set(25);
    });

    doneBtn.addEventListener('click', function() {
      window.close();
    });

  });
})();

