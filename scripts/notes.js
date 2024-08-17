first = true;
var editableTextbox;
initialContent = "Lägg till kommentar...";
note = "";
var lessonName = "";
var notes = {
    "test": "test"
};



document.addEventListener('click', function(e) {
    e = e || window.event;
    var target = e.target;

    if (target.getAttribute('box-type') === 'Lesson' && target.style.fill != "rgb(192, 192, 192)") {
        w_panel = document.querySelector("body > div.w-widget-timetable-viewer > div.w-page-content > div > div.w-modal.w-modal-xs.open > div > div > div.w-modal-body > div > div");
        w_panel_content = w_panel.querySelector("div.w-panel-content.w-panel-content-flat");
        lessonName = w_panel.querySelector("div.w-panel-content.w-panel-content-flat > ul > li > div > div.w-item-primary-text > span").innerHTML;
        
        chrome.storage.sync.get([ "notes" ], function(result){
            if (result.notes === undefined) {
                var jsonNotes = JSON.stringify(notes);

                chrome.storage.sync.set({ "notes": jsonNotes }).then(() => {
                    console.log("note updated from undefined");
                });
            }
            else {
                notes = JSON.parse(result.notes);
            }

            if (notes[lessonName] === undefined) {
                console.log(lessonName)
                console.log(notes[lessonName]);
                console.log("Lesson was undefined");

                editableTextbox.textContent = initialContent;
            }
            else {
                if (notes[lessonName] != '') {
                    editableTextbox.textContent = notes[lessonName];
                }
                else {
                    editableTextbox.textContent = initialContent;
                }
            }
        })

        w_panel.style.marginBottom = "0px";

        if (first) {
            console.log("NOTES LOADED!!");
            // Create a new div element
            editableTextbox = document.createElement('div');

            // Set attributes for the div
            editableTextbox.id = 'editableTextbox';
            editableTextbox.setAttribute('contenteditable', 'false');
            editableTextbox.textContent = initialContent;
            editableTextbox.style.border = '1px solid #ccc';
            editableTextbox.style.padding = '5px';
            editableTextbox.style.cursor = 'pointer';

            w_panel_content.querySelector("ul").after(editableTextbox);

            document.getElementById("editableTextbox").addEventListener("click", makeEditable);

            first = false;
        }

        if (editableTextbox.style.display == 'none') {
            editableTextbox.style.display = 'block';
        }
    }
    else if (target.style.fill == "rgb(192, 192, 192)") {
        editableTextbox.style.display = 'none';
    }
}, false);

function makeEditable() {
    // If the content is the initial placeholder, clear it for editing
    if (editableTextbox.textContent.trim() === initialContent) {
        editableTextbox.textContent = '';
    }


    editableTextbox.contentEditable = true;
    editableTextbox.style.border = '1px solid #000'; // Optional: Change border color to indicate edit mode

    // Get the range and selection objects
    var range = document.createRange();
    var sel = window.getSelection();

    // Set the range based on the click position
    range.setStart(sel.anchorNode, sel.anchorOffset);
    range.collapse(true);

    // Set the selection to the new range
    sel.removeAllRanges();
    sel.addRange(range);

    // Add blur event listener to make it non-editable again
    editableTextbox.addEventListener('blur', function() {
            editableTextbox.contentEditable = false;
            editableTextbox.style.border = '1px solid #ccc'; // Optional: Change border color back to default

            if (editableTextbox.textContent != initialContent) { notes[lessonName] = editableTextbox.textContent; }
            else {
                notes[lessonName] = '';
                editableTextbox.textContent = initialContent;
            }
            var jsonNotes = JSON.stringify(notes);

            console.log(jsonNotes);

            chrome.storage.sync.set({ "notes": jsonNotes }).then(() => {
                console.log("note updated");
            });

            if (editableTextbox.textContent.trim() === '') {
                editableTextbox.textContent = initialContent;
            }
    });
}