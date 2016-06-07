(function() {
  chrome.storage.sync.get([
    'webkitTextStroke',
    'disabled'
  ], function(items) {
    document.body.style.webkitFontSmoothing = items.disabled ? '' : 'antialiased';
    document.body.style.webkitTextStroke = items.disabled ? '' : items.webkitTextStroke
      ? (items.webkitTextStroke / 100) + 'px'
      : '0.25px';
  });
})();

