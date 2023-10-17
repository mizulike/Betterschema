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