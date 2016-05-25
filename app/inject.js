chrome.storage.sync.get([
  'webkitTextStroke', 'webkitFontSmoothing'
], function(items) {
  document.body.style.webkitTextStroke = items.webkitTextStroke || '0.25px';
  document.body.style.webkitFontSmoothing = items.webkitFontSmoothing || 'antialiased';
});