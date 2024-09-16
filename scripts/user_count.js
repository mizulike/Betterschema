async function createUser() {
    res = await fetch('https://yct8qbbbs7.execute-api.eu-north-1.amazonaws.com/production');
    return res.json();
}


async function getUUID() {
    return new Promise((resolve) => {
        chrome.storage.sync.get([ "UUID" ], async function(result) {
            if (result.UUID) {
                console.log(`UUID EXISTS! CHECKING VALIDITY of ${result.UUID}`);

                let isUUIDValid = await verifyUUID(result.UUID);

                if (isUUIDValid) {
                    console.log("UUID IS VALID! RESOLVING!");
                    resolve(result.UUID);
                }
                else {
                    console.log("UUID IS NOT VALID, CREATING NEW USER!");

                    let UUID = await createUser();
                    console.log(`NEW UUID CREATED: ${UUID} ADDING IT TO STORAGE!`);

                    chrome.storage.sync.set({ "UUID": UUID });

                    resolve(UUID);
                }
            }
    
            else {
                console.log("UUID does NOT exist! Creating UUID!");
                let UUID = await createUser();
                console.log(`NEW UUID CREATED: ${UUID} ADDING IT TO STORAGE!`);
    
                chrome.storage.sync.set({ "UUID": UUID });
    
                resolve(UUID);
            }
        });
    })
}

async function verifyUUID(UUID) {
    res = await fetch('https://idfo0s5kxe.execute-api.eu-north-1.amazonaws.com/production', {
        method: "POST",
        body: JSON.stringify({"UUID": UUID})
    });

    let isUUIDValid = await res.json();

    return isUUIDValid;
}

async function sendHeartBeat(UUID) {
    await fetch('https://s1y6o9r9ej.execute-api.eu-north-1.amazonaws.com/production', {
        method: 'POST',
        body: JSON.stringify({"UUID": UUID})
    });

    console.log("SENT HEART BEAT!!! NOW GETTING USER COUNT!!!");

    await getUserCount();

    // console.log(`User Count: ${userCount}`);
}

async function getUserCount() {
    res = await fetch('https://e7ovapbaoe.execute-api.eu-north-1.amazonaws.com/production');
    let userCount = await res.json();
    
    document.querySelector("body > div.w-widget-timetable-viewer > div.w-page-header > div > div > div:nth-child(2)").innerHTML = `Online i Betterschema: ${userCount}`;
}

async function main_user_count() {
    let UUID = await getUUID();

    console.log(`Using UUID: ${UUID}`);

    sendHeartBeat(UUID)
    setInterval(function() {
        sendHeartBeat(UUID)
    }, 1000*60*5);
}

main_user_count();


