function toggleDarkMode(enabled) {
    var period = document.querySelector("body > div.w-widget-timetable-viewer > div.w-page-content > div > div:nth-child(2) > div.w-panel-footer > div:nth-child(1) > div:nth-child(7)");
    if (period) {
        if (!enabled) {
            document.querySelector("body > div.w-widget-timetable-viewer > div.w-page-content").style.backgroundColor = '';
            document.querySelector("body > div.w-widget-timetable-viewer > div.w-page-content > div > div:nth-child(2) > div.w-panel-footer").style.backgroundColor = 'white';
            
            var several = document.querySelectorAll('.w-col');
            for (var i = 0; i < several.length; i++) {
                several[i].style.color = '';
            }

            document.querySelector("body > div.w-widget-timetable-viewer > div.w-page-content > div > div:nth-child(2) > div:nth-child(2)").style.backgroundColor = '';

            // Get all elements with the specified selectors
            var inputboxes = document.querySelectorAll('select, input[type=text], input[type=password], input[type=number]');

            // Loop through the elements and change their background color
            inputboxes.forEach(function(element) {
                element.style.backgroundColor = '#fff';
            });

            document.querySelector("body > div.w-widget-timetable-viewer > div.w-page-content > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > span").style.color = '#484d5b';
        }
        else {
            document.querySelector("body > div.w-widget-timetable-viewer > div.w-page-content").style.backgroundColor = '#505050';
            document.querySelector("body > div.w-widget-timetable-viewer > div.w-page-content > div > div:nth-child(2) > div.w-panel-footer").style.backgroundColor = '#606060';
            
            var several = document.querySelectorAll('.w-col');
            for (var i = 0; i < several.length; i++) {
                several[i].style.color = 'white';
            }

            document.querySelector("body > div.w-widget-timetable-viewer > div.w-page-content > div > div:nth-child(2) > div:nth-child(2)").style.backgroundColor = '#606060';

            // Get all elements with the specified selectors
            var inputboxes = document.querySelectorAll('select, input[type=text], input[type=password], input[type=number]');

            // Loop through the elements and change their background color
            inputboxes.forEach(function(element) {
                element.style.backgroundColor = '#505050';
            });

            document.querySelector("body > div.w-widget-timetable-viewer > div.w-page-content > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > span").style.color = 'white';
        }
    }
    else {
        setTimeout(function(){
            toggleDarkMode(enabled);
        }, 100);
    }
}

document.addEventListener('keydown', (event) => {
    if (event.key == '<') {
        toggleDarkMode();
    }
}, false);

chrome.storage.sync.get([ "darkMode" ], function(result){
    if (result.darkMode) {
        toggleDarkMode(true);
    }
});

chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if (key === 'darkMode') {
            toggleDarkMode(newValue);
        }
    }
});
  