function themify() {
    toggle = true;
    rectangles = document.querySelectorAll('rect');
    texts = document.querySelectorAll('text');

    texts.forEach(text => {
        text.style.fill = "rgb(255, 255, 255)";
    })

    // Iterate through each <rect> element
    rectangles.forEach(rectangle => {
        // Check if the current <rect> has the attribute box-type="lesson"
        if (rectangle.getAttribute('box-type') === 'Lesson') {
            // Do something with the matching <rect> element
            if (toggle) {
                rectangle.style.fill = "rgb(0, 0, 0)";
                toggle = false;
            }
            else {
                rectangle.style.fill = "rgb(255, 165, 0)";
                toggle = true;
            }
        }
    });
};

function pastelify() {
    rectangles = document.querySelectorAll('rect');

    // Iterate through each <rect> element
    rectangles.forEach(rectangle => {
        // Check if the current <rect> has the attribute box-type="lesson"
        if (rectangle.getAttribute('box-type') === 'Lesson') {
            rectangle.style.fill = toPastel(rectangle.style.fill, 0.5);
        }
    });
}

function toPastel(rgbString, blendFactor = 0.5) {
    // Ensure blendFactor is between 0 and 1
    if (blendFactor < 0 || blendFactor > 1) {
      throw new Error("blendFactor should be between 0 and 1");
    }
  
    // Extract the numbers from the string
    let matches = rgbString.match(/\d+/g).map(Number);
  
    // Make sure we extracted three numbers
    if (matches.length !== 3) {
      throw new Error("Invalid RGB format");
    }
  
    let [r, g, b] = matches;
  
    // Blend with white based on the blendFactor
    let pastelR = Math.round(r + (255 - r) * blendFactor);
    let pastelG = Math.round(g + (255 - g) * blendFactor);
    let pastelB = Math.round(b + (255 - b) * blendFactor);
  
    return `rgb(${pastelR}, ${pastelG}, ${pastelB})`;
}

// document.addEventListener('keydown', (event) => {
//     if (event.key == 't') {
//         // themify();
//         pastelify();
//     }
// }, false);