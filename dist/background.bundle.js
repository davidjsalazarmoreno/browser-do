/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);