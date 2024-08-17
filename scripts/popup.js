var sliders = document.getElementsByClassName('slider');
for (let i = 0; i < sliders.length; i++) {
    sliders[i].classList.add('new-transition-properties');
}

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

checkbox2 = document.getElementById("checkbox2");

checkbox2.addEventListener("change", function(){
    if (checkbox2.checked) {
        chrome.storage.sync.set({ "timeMarker": true });
    }
    else {
        chrome.storage.sync.set({ "timeMarker": false });
    }
});

chrome.storage.sync.get([ "timeMarker" ], function(result){
    if (result.timeMarker) {
        checkbox2.checked = true;
    }
})

darkmode = document.getElementById('darkmode');

darkmode.addEventListener("change", function(){
    if (darkmode.checked) {
        chrome.storage.sync.set({ "darkMode": true });
    }
    else {
        chrome.storage.sync.set({ "darkMode": false });
    }
});

chrome.storage.sync.get([ "darkMode" ], function(result){
    if (result.darkMode) {
        darkmode.checked = true;
    }
})