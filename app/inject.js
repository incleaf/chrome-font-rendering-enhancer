(function() {
  chrome.storage.sync.get([
    'webkitTextStroke'
  ], function(items) {
    document.body.style.webkitFontSmoothing = 'antialiased';
    document.body.style.webkitTextStroke = items.webkitTextStroke
      ? (items.webkitTextStroke / 100) + 'px'
      : '0.25px';
  });
})();

