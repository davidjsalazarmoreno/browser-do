// https://developer.chrome.com/extensions/bookmarks#method-search
// https://developer.chrome.com/extensions/bookmarks
// https://encrypted.google.com/search?hl=es&q=creating%20a%20floating%20modal%20chrome%20extensions
// http://stackoverflow.com/questions/10340481/popup-window-in-chrome-extension
// https://www.iconfinder.com/icons/106236/search_icon#size=128

// chrome.bookmarks.search('chrome.commands - Google Chrome', function() {
//   chrome.extension.getBackgroundPage().console.log('foo');
//   console.log(arguments);
// });

chrome.runtime.onMessage.addListener(function(request) {
  console.log(request);
});


chrome.commands.onCommand.addListener(function(command) {
  var width = 700,
      height = 125,
      top = (screen.height/2)-(height/2),
      left = (screen.width/2)-(width/2);
  //console.log(command);
  //console.log(chrome.tabs.query({}));

  console.log('Command');
  chrome.windows.getAll({
    windowTypes: ['popup']
  }, function(results) {
    console.info('Shortcut');
    console.log(results);

    if ( results.length === 0 ) {
        console.info('Showing BrowserDo');
      chrome.windows.create({
        url: 'browser-do-popup.html',
        focused: true,
        type: 'popup',
        width: width,
        height: height,
        top: Math.round(top),
        left: Math.round(left)
      });

    } else {
      chrome.windows.remove(results[0].id, function() {
        console.info('Hiding BrowserDo');
      })
    }

  });



});
