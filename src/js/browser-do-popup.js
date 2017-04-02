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
