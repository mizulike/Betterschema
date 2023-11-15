let food = [];
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

            week = document.getElementsByClassName("w-menu-item w-selected")[1].querySelector('span').innerHTML.split(",")[0].split(".")[1].split(" ")[0];
            matsedel(week);
        });

        

        weekSelection = document.querySelector("body > div.w-widget-timetable-viewer > div.w-page-content > div > div:nth-child(2) > div.w-panel-footer > div:nth-child(1) > div:nth-child(2) > div > div > input");
        weekSelectionButton = document.querySelector("body > div.w-widget-timetable-viewer > div.w-page-content > div > div:nth-child(2) > div.w-panel-footer > div:nth-child(1) > div:nth-child(2) > div > div > button");
        weekSelection2 = document.querySelector("body > div.w-widget-timetable-viewer > div.w-page-content > div > div:nth-child(2) > div.w-panel-footer > div:nth-child(1) > div:nth-child(2) > div > div > ul");

        weekSelection.addEventListener("click", function(){
            week = document.getElementsByClassName("w-menu-item w-selected")[1].querySelector('span').innerHTML.split(",")[0].split(".")[1].split(" ")[0];
            matsedel(week);
            console.log(week);
        });

        weekSelectionButton.addEventListener("click", function(){
            week = document.getElementsByClassName("w-menu-item w-selected")[1].querySelector('span').innerHTML.split(",")[0].split(".")[1].split(" ")[0];
            matsedel(week);
        });

        weekSelection2.addEventListener("click", function(){
            week = document.getElementsByClassName("w-menu-item w-selected")[1].querySelector('span').innerHTML.split(",")[0].split(".")[1].split(" ")[0];
            matsedel(week);
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

// main();

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

function getMatsedel(week) {
    const url = 'https://matsedelapi.hokuspookus.repl.co/matsedel_week/' + week;

    // Make a GET request using the fetch function
    return fetch(url)
        .then(response => {
        // Check if the request was successful (status code 200)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Parse the JSON in the response
        return response.json();
        })
        .then(data => {
        // Handle the JSON data
        // console.log(data); // Output: { "Mat": "Ugnstekt fisk med kokt potatis och remouladsås." }
        return data['veckomat']
        })
        .catch(error => {
        // Handle errors
        console.error('Fetch error:', error);
        });
}

async function getAllMatsedlar() {
    const results = [];

    for (let i = 0; i <= 4; i++) {
        try {
            const data = await getMatsedel(i);
            results.push(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            // You might want to handle the error here based on your requirements
        }
    }

    console.log('Results:', results);
    return results;
}

// Stores this week's food inside the 'food' array
async function matsedel(week) {
    try {
        food = await getMatsedel(week);
        // console.log('Food:', food);

        // console.log(food);

        week = document.getElementsByClassName("w-menu-item w-selected")[1].querySelector('span').innerHTML.split(",")[0].split(".")[1].split(" ")[0];
        // console.log(week);

    } catch (error) {
        console.error('Main error:', error);
    }
}

function replaceWithFood() {
    dayHeader = document.querySelector("body > div.w-widget-timetable-viewer > div.w-page-content > div > div.w-modal.w-modal-xs.open > div > div > div.w-modal-body > div > div > div.w-panel-header > h2").innerHTML.split(" ")[0];
    subjectContent = document.querySelector("body > div.w-widget-timetable-viewer > div.w-page-content > div > div.w-modal.w-modal-xs.open > div > div > div.w-modal-body > div > div > div.w-panel-content.w-panel-content-flat > ul > li > div");

    switch (dayHeader) {
        case "Måndag":
            subjectContent.innerHTML = food[0];
            break;

        case "Tisdag":
            subjectContent.innerHTML = food[1];
            break;

        case "Onsdag":
            subjectContent.innerHTML = food[2];
            break;

        case "Torsdag":
            subjectContent.innerHTML = food[3];
            break;

        case "Fredag":
            subjectContent.innerHTML = food[4];
            break;
    }
}


// Run replaceWithFood when user clicks a rectangle with grey fill (exclusive to lunch)
document.addEventListener('click', function(e) {
    e = e || window.event;
    var target = e.target;

    if (target.style.fill == "rgb(192, 192, 192)") {
        replaceWithFood();
    }
}, false);


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