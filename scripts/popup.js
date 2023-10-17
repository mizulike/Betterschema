document.getElementById("presetForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevents the default form submission
    var presetValue = document.getElementById("preset").value;
    updatePreset(presetValue);
});

function updatePreset(presetValue) {
    chrome.storage.sync.set({ "presetValue": presetValue }).then(() => {
        console.log("Value is set");
    });
}

checkbox = document.getElementById("checkbox");

checkbox.addEventListener("change", function(){
    if (checkbox.checked) {
        chrome.storage.sync.set({ "automaticLoad": true });
    }
    else {
        chrome.storage.sync.set({ "automaticLoad": false });
    }
});

chrome.storage.sync.get([ "automaticLoad" ], function(result){
    if (result.automaticLoad) {
        checkbox.checked = true;
    }
})