let xPos = [
    "48",
    "274",
    "499",
    "725",
    "950"
]

function dynamicTime() {
    currentDate = new Date();

    let day = currentDate.getDay()-1;
    // let day = 2;

    if (document.querySelector("#timetableElement > svg")) {
        try {
            for (let timeMarker of document.querySelectorAll(".timeMarker")) {
                timeMarker.remove();
            }
        } catch { 
            console.log("can't delete");
        };

        let timetable = document.querySelector("#timetableElement > svg");

        // Use querySelectorAll to get all rect elements with box-type of TimetableDay
        rectangles = timetable.querySelectorAll('rect');

        // console.log(timetable.querySelector('rect[box-type="TimetableDay"]'));


        let rectangleDataArray = Array.from(rectangles).map(rect => {
            return {
                element: rect,
                x: rect.getAttribute('x'),
                y: rect.getAttribute('y'),
                width: rect.getAttribute('width'),
                height: rect.getAttribute('height'),
                fill: rect.style.fill,
                stroke: rect.style.stroke,
                boxType: rect.getAttribute('box-type')
                // ... add any other attributes you need
            };
        });

        let timetableDays = rectangleDataArray.filter(rectData => rectData.boxType === "TimetableDay");

        let lessons = rectangleDataArray.filter(rectData => rectData.boxType === "Lesson");

        let dayHeaders = rectangleDataArray.filter(rectData => rectData.boxType === "HeadingDay");

        dayHeaderWidth = dayHeaders[0].width;
        dayHeaderX = [];

        for (let i = 0; i < 5; i++) {
            dayHeaderX[i] = dayHeaders[i].x;
        }

        timetableDayHeight = getHeight();

        let groupedByX = {};

        // Grouping rectangles by 'x' value
        lessons.forEach(rect => {
            if (!groupedByX[rect.x]) {
                groupedByX[rect.x] = [];
            }
            groupedByX[rect.x].push(rect);
        });

        // Convert the groupedByX object to separate arrays
        lessons = Object.values(groupedByX);

        let svgContainer = document.querySelector("#timetableElement > svg");

        if (getSelectedWeek() < getCurrentWeek()) {
            for (let i = 0; i < 5; i++) {
                rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    
                rect.setAttribute("x", dayHeaderX[i]);
                rect.setAttribute("y", "30");
                rect.setAttribute("width", String(dayHeaderWidth));
                rect.setAttribute("height", String(timetableDayHeight));
                rect.setAttribute("fill", "rgba(204, 204, 204, 0.5)");
                rect.setAttribute("class", "timeMarker");
                rect.setAttribute("pointer-events", "none");
    
                // Append the rect element to the SVG container
                svgContainer.appendChild(rect);
            }
        }
        else if (getSelectedWeek() == getCurrentWeek()) {
            // lessons[day].forEach(rect => {
            //     y = parseInt(rect.y);
            //     height = parseInt(rect.height);

            //     if (y < parseInt(timeToHeight()) && y + height < parseInt(timeToHeight())) {
            //         rect.strokeWidth = 5;
            //         console.log(rect);
            //     }
            // });

            for (let i = 0; i < day; i++) {
                rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    
                rect.setAttribute("x", dayHeaderX[i]);
                rect.setAttribute("y", "30");
                rect.setAttribute("width", String(dayHeaderWidth));
                rect.setAttribute("height", String(timetableDayHeight));
                rect.setAttribute("fill", "rgba(204, 204, 204, 0.5)");
                rect.setAttribute("class", "timeMarker");
                rect.setAttribute("pointer-events", "none");
    
                // Append the rect element to the SVG container
                svgContainer.appendChild(rect);
            }
    
            // Create a new rect element
            rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    
            // Set the attributes for the rect element
            rect.setAttribute("x", dayHeaderX[day]);
            rect.setAttribute("y", "30");
            rect.setAttribute("width", String(dayHeaderWidth));
            rect.setAttribute("height", timeToHeight());
            rect.setAttribute("fill", "rgba(204, 204, 204, 0.5)");
            rect.setAttribute("class", "timeMarker");
            rect.setAttribute("pointer-events", "none");
    
            // Append the rect element to the SVG container
            svgContainer.appendChild(rect);
        }
        setTimeout(dynamicTime, 100);
    }
    else {
        setTimeout(dynamicTime, 10);
    }
}

function convertRgbToRgba(rgbString, alpha) {
    // Extract the R, G, B values
    let matches = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

    if (!matches) {
        throw new Error('Invalid RGB string');
    }

    // Construct the new RGBA string
    let rgbaString = `rgba(${matches[1]}, ${matches[2]}, ${matches[3]}, ${alpha})`;
    
    return rgbaString;
}

function timeToHeight() {
    let currentDate = new Date();
    let pixelsPerMinute = getPixelsPerMinute();

    let hours = parseInt(currentDate.getHours());
    let minutes = parseInt(currentDate.getMinutes());
    // let hours = 13;
    // let minutes = 15;

    // if (8 <= hours && hours < 16) {
        totalMinutes = (hours-8)*60 + minutes;

        if (totalMinutes * pixelsPerMinute < getHeight()) {
            return String(totalMinutes * pixelsPerMinute);
        }
        
    // }
    else {
        return hours < 8 ? "0" : getHeight();
    }
}

function getPixelsPerMinute() {
    // Get all <line> elements where x1="1"
    const lines = document.querySelectorAll('line[x1="1"]');

    // Extract the y1 attributes of the first two matches
    const y1Values = Array.from(lines).slice(0, 2).map(line => line.getAttribute('y1'));

    pixelsPerHour = y1Values[1] - y1Values[0];

    pixelsPerMinute = pixelsPerHour / 60;

    // console.log(pixelsPerMinute);

    return pixelsPerMinute;
}

function getSelectedWeek() {
    return document.getElementsByClassName("w-menu-item w-selected")[1].querySelector('span').innerHTML.split(",")[0].split(".")[1].split(" ")[0];
}

function getCurrentWeek() {
    currentDate = new Date();
    startDate = new Date(currentDate.getFullYear(), 0, 1);
    var days = Math.floor((currentDate - startDate) /
        (24 * 60 * 60 * 1000));
    
    var weekNumber = Math.ceil(days / 7);
    
    return String(weekNumber);
}

function getHeight() {
    let timetable = document.querySelector("#timetableElement > svg");

    // Use querySelectorAll to get all rect elements with box-type of TimetableDay
    rectangles = timetable.querySelectorAll('rect');

    // console.log(timetable.querySelector('rect[box-type="TimetableDay"]'));


    let rectangleDataArray = Array.from(rectangles).map(rect => {
        return {
            element: rect,
            x: rect.getAttribute('x'),
            y: rect.getAttribute('y'),
            width: rect.getAttribute('width'),
            height: rect.getAttribute('height'),
            fill: rect.style.fill,
            stroke: rect.style.stroke,
            boxType: rect.getAttribute('box-type')
            // ... add any other attributes you need
        };
    });

    let timetableDays = rectangleDataArray.filter(rectData => rectData.boxType === "TimetableDay");

    timetableDayHeight = timetableDays[0].height;

    return timetableDayHeight;
}

chrome.storage.sync.get([ "timeMarker" ], function(result){
    // if (result.timeMarker === undefined) {
    //     console.log("Time marker is undefined, setting to true");
    //     chrome.storage.sync.set({ "timeMarker": true });
    // }
    // else {
        if (result.timeMarker) {
            dynamicTime();
        }
    // } 
});

// function lessonFromTime(time) {

// }
