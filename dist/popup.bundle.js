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

	import "../css/bootstrap.min.css";
	import "../css/popup.css";

	document.addEventListener('DOMContentLoaded', function() {
	  var input = document.querySelector('body input'),
	      resultsElement = document.getElementById('results');

	  // chrome.windows.getAll({
	  //     windowTypes: ['normal']
	  //   }, function(results) {
	  //     console.log(results);
	  // });
	  
	  input.addEventListener('keypress', function(event) {
	    // console.log(event.target.value);

	    chrome.bookmarks.search(event.target.value, function(results) {
	      if ( results !== null && results.length > 0 ) {
	        resultsElement.innerHTML = results[0].title;
	        //console.log(results);
	      }

	    });
	  

	    chrome.tabs.query({
	      currentWindow: false, 
	      title: `*${event.target.value}*`
	    }, function(tabsArray) {
	      console.log(tabsArray);
	      if( tabsArray !== null && tabsArray.length > 0 ) {
	        // var tab = tabsArray.filter(function(curTab, index) {
	        //   return curTab.title.includes(event.target.value);
	        // });
	        // console.log(tab);
	        
	        tabsArray.length > 0 && chrome.tabs.update(tabsArray[0].id, { active: true });

	      }

	    });

	  });
	}, false);


/***/ }
/******/ ]);