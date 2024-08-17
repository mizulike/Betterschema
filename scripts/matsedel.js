let food = [];

function matsedelMain() {
    var period = document.querySelector("body > div.w-widget-timetable-viewer > div.w-page-content > div > div:nth-child(2) > div.w-panel-footer > div:nth-child(1) > div:nth-child(7)");
    if (period) {
        week = document.getElementsByClassName("w-menu-item w-selected")[1].querySelector('span').innerHTML.split(",")[0].split(".")[1].split(" ")[0];
        matsedel(week);
        
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
    }
    else {
        setTimeout(function(){
            matsedelMain();
        }, 100);
    }
}

matsedelMain();


function getMatsedel(week) {
    const url = 'https://api.hokuspookus.xyz/matsedel/matsedel_week?week=' + week;

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

// Stores this week's food inside the 'food' array
async function matsedel(week) {
    try {
        food = await getMatsedel(week);
        console.log(food);
    } catch (error) {
        console.error('Main error:', error);
    }
}

function replaceWithFood() {
    dayHeader = document.querySelector("body > div.w-widget-timetable-viewer > div.w-page-content > div > div.w-modal.w-modal-xs.open > div > div > div.w-modal-body > div > div > div.w-panel-header > h2").innerHTML.split(" ")[0];
    subjectContent = document.querySelector("body > div.w-widget-timetable-viewer > div.w-page-content > div > div.w-modal.w-modal-xs.open > div > div > div.w-modal-body > div > div > div.w-panel-content.w-panel-content-flat > ul > li > div");

    switch (dayHeader) {
        case "Måndag":
            subjectContent.innerHTML = food['0'][0] + '<br><br>' + food['0'][1];
            break;

        case "Tisdag":
            subjectContent.innerHTML = food['1'][0] + '<br><br>' + food['1'][1];            
            break;

        case "Onsdag":
            subjectContent.innerHTML = food['2'][0] + '<br><br>' + food['2'][1];            
            break;

        case "Torsdag":
            subjectContent.innerHTML = food['3'][0] + '<br><br>' + food['3'][1];
            break;

        case "Fredag":
            subjectContent.innerHTML = food['4'][0] + '<br><br>' + food['4'][1];            
            break;
    }
}

document.addEventListener('click', function(e) {
    e = e || window.event;
    var target = e.target;

    if (target.style.fill == "rgb(192, 192, 192)") {
        replaceWithFood();
    }
}, false);