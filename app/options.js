var slider = document.getElementById('slider');

noUiSlider.create(slider, {
  start: 25,
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

function save_options() {
  // Saves options to chrome.storage.sync.
  chrome.storage.sync.set({
    webkitTextStroke: '0.5px'
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}
document.getElementById('save').addEventListener('click', save_options);
