let presetValue = "";

chrome.storage.sync.get([ "automaticLoad" ], function(result){
    // console.log(result.automaticLoad);
    main(result.automaticLoad);
})

// Clones the style of 'el2' into 'el1'
function cloneStyle(el1, el2) {
    const styles = window.getComputedStyle(el2);

    let cssText = styles.cssText;

    if (!cssText) {
    cssText = Array.from(styles).reduce((str, property) => {
        return `${str}${property}:${styles.getPropertyValue(property)};`;
    }, '');
    }

    // 👇️ Assign CSS styles to the element
    el1.style.cssText = cssText;
}

// Locates the 'period' element and clones it turning it into a presets button
function main(automatic) {
    // console.log(automatic);
    var period = document.querySelector("body > div.w-widget-timetable-viewer > div.w-page-content > div > div:nth-child(2) > div.w-panel-footer > div:nth-child(1) > div:nth-child(7)");
    if (period) {
        clone = period.cloneNode(true);
        period.after(clone);

        label = document.querySelector("body > div.w-widget-timetable-viewer > div.w-page-content > div > div:nth-child(2) > div.w-panel-footer > div:nth-child(1) > div:nth-child(8) > div > label > span");
        label.innerHTML = 'Presets';

        document.querySelector("body > div.w-widget-timetable-viewer > div.w-page-content > div > div:nth-child(2) > div.w-panel-footer > div:nth-child(1) > div:nth-child(8) > div > div > button").remove();
        
        Button = document.createElement('a');
        Button.id = 'presetButton';

        buttonPlace = document.querySelector("body > div.w-widget-timetable-viewer > div.w-page-content > div > div:nth-child(2) > div.w-panel-footer > div:nth-child(1) > div:nth-child(8) > div > div > input");
        buttonStyle = document.querySelector("body > div.w-widget-timetable-viewer > div.w-page-content > div > div:nth-child(2) > div.w-panel-footer > div:nth-child(1) > div:nth-child(1) > div > div > input");
        // console.log(buttonPlace)
        cloneStyle(Button, buttonStyle);

        chrome.storage.sync.get(["presetValue"], function(result) {
            // result is an object with the keys you requested
            presetValue = result.presetValue;
          
            // Now you can use the value
            Button.innerHTML = presetValue;
        });
          
        Button.style.textAlign = 'center';
        Button.style.cursor = 'pointer';

        buttonPlace.replaceWith(Button);

        

        // Dictates action when preset is clicked
        Button.addEventListener('click', function(event) {
            inputBox = document.querySelector("body > div.w-widget-timetable-viewer > div.w-page-content > div > div:nth-child(2) > div.w-panel-footer > div:nth-child(1) > div:nth-child(6) > div > div > input");
            inputBox.value = Button.innerHTML + 'a';
            inputBox.focus();
            document.execCommand('delete', false, null);
            
            inputButton = document.querySelector("body > div.w-widget-timetable-viewer > div.w-page-content > div > div:nth-child(2) > div.w-panel-footer > div:nth-child(1) > div:nth-child(6) > div > div > Button");

            setTimeout(function() {
                inputButton.click();
            }, 0);
        });

        if (automatic) {
            setTimeout(function(){
                Button.click();
            }, 10);
        }     
    }
    else {
        setTimeout(function(){
            main(automatic);
        }, 100);
    }
}

// Create a new KeyboardEvent
var backspaceEvent = new KeyboardEvent('keydown', {
    key: 'Backspace',  // specify the key you want to simulate
    bubbles: true,
    cancelable: true,
});

// Create a new KeyboardEvent
var enterEvent = new KeyboardEvent('keydown', {
    key: 'Enter',  // specify the key you want to simulate
    bubbles: true,
    cancelable: true,
});

chrome.storage.onChanged.addListener((changes, namespace) => {
    presetButton = document.getElementById("presetButton");

    chrome.storage.sync.get(["presetValue"], function(result) {
        // result is an object with the keys you requested
        presetValue = result.presetValue;
      
        // Now you can use the value
        presetButton.innerHTML = presetValue;
    });
});

// chrome.storage.sync.remove("timeMarker");