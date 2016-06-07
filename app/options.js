(function() {
  chrome.storage.sync.get([
    'webkitTextStroke',
    'disabled'
  ], function(items) {
    // Values from localStorage
    var strokeSize = items.webkitTextStroke || 25;
    var disabled = items.disabled || false;

    // DOM Elements
    var slider = document.getElementById('slider');
    var resetBtn = document.getElementById('resetBtn');
    var doneBtn = document.getElementById('doneBtn');
    var toggle = document.getElementById('toggle');

    // Variables using on logic
    var isSliding;

    toggle.checked = !disabled;
    updateSlider(!disabled);

    noUiSlider.create(slider, {
      start: strokeSize,
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

    toggle.addEventListener('change', function(e) {
      updateSlider(e.target.checked);
      chrome.storage.sync.set({
        disabled: !e.target.checked
      }, function() {
        chrome.tabs.executeScript({
          file: 'inject.js'
        });
      });
    });

    function updateSlider(isEnabled) {
      if (isEnabled === true) {
        slider.removeAttribute('disabled');
      } else {
        slider.setAttribute('disabled', true);
      }
    }
  });
})();

