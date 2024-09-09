var firstf = true;

var lesson_colors = {
    'test': ['test', 'test2']
};

console.log(lesson_colors);

function rgbToHex(rgb) {
    // Extracting the red, green, and blue values
    var match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!match) {
        // if the input is not in the correct format
        return rgb;
    }

    // Converting the RGB values to hexadecimal
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }

    // Creating the hexadecimal string
    var hexString = "#" + hex(match[1]) + hex(match[2]) + hex(match[3]);

    return hexString;
}

function hexToRgb(hex) {
    // Remove '#' if present
    hex = hex.replace(/^#/, '');

    // Parse hex values into R, G, B components
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);

    // Return RGB string
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}


function monitorColorChanges(element, color) {
    // Function to execute when color changes
    function handleColorChange() {
        // Do something when the color changes
        console.log('Color changed for element:', element);
        element.style.fill = color;
        console.log(color);
        // You can add any actions you want here
    }

    // Set up a MutationObserver to watch for style changes
    const observer = new MutationObserver(mutationsList => {
        for (let mutation of mutationsList) {
            if (mutation.attributeName === 'style') {
                // Check if color property has changed
                const style = window.getComputedStyle(element);
                const fill = style.getPropertyValue('fill');
                // Call the function if color changes
                handleColorChange();
                break;
            }
        }
    });

    // Start observing the element
    observer.observe(element, { attributes: true });
}

document.addEventListener('click', function(e) {
    e = e || window.event;
    var target = e.target;

    if (target.getAttribute('box-type') === 'Lesson' && target.style.fill != "rgb(192, 192, 192)") {
        // Load the color picker if it's the first time user clicks on a lesson
        if (firstf){
            var editableTextbox = document.querySelector("#editableTextbox");
    
            var colorPicker = document.createElement('input');
            
            colorPicker.setAttribute("class", "w-col w-s6 w-m3 w-12");
            colorPicker.setAttribute("type", "color");
            colorPicker.setAttribute("id", "favcolor");
            colorPicker.setAttribute("name", "favcolor");
            colorPicker.setAttribute("value", "#ff0000");
            
            editableTextbox.insertAdjacentElement('afterend', colorPicker);
            

            var resetButton = document.createElement('button');
            resetButton.innerHTML = 'RESET';

            colorPicker.insertAdjacentElement('afterend', resetButton);

            firstf = false;

            console.log('COLOR PICKER LOADED!!')
        }
        var color_picker = document.getElementById('favcolor');
        cLessonName = w_panel.querySelector("div.w-panel-content.w-panel-content-flat > ul > li > div > div.w-item-primary-text > span").innerHTML;
        
        if (lesson_colors[cLessonName] === undefined) {
            lesson_colors[cLessonName] = [target.style.fill, target.style.fill];
            console.log(lesson_colors);
        }
        
        color_picker.value = rgbToHex(lesson_colors[cLessonName][1]);

        // target.style.fill = hexToRgb(color_picker.value)

        // refresh(target, color_picker.value)
        // monitorColorChanges(target, hexToRgb(color_picker.value))

        color_picker.addEventListener('input', function() {
            console.log('COLOR WHEEL UPDATED!?');
            target.style.fill = hexToRgb(color_picker.value);
            lesson_colors[cLessonName][1] = target.style.fill;

            // refresh(target, color_picker.value)
            // monitorColorChanges(target, hexToRgb(color_picker.value));
        });
    }
}, false);

color_picker.addEventListener('change', function(event) {
    console.log("changed");
});

function colorChanged() {

}

function refresh(target, color) {
    target.style.fill = color;
    console.log('refreshing TO ' + color);

    setTimeout(function(){
        refresh(target, color);
    }, 10);
}