//content.js

function ProcessResponse(response) {
    var respSplit = response.split(';'),
        respObj = JSON.parse(respSplit[respSplit.length - 1]),
        objId = respObj.jsmods.require[0][3][0][1];
    return objId;
}

function DoRequest(strURL) {
    var req = new XMLHttpRequest();
    req.open('GET', strURL);
    req.send();
    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            if (req.status === 200) {
                return ProcessResponse(req.responseText);
            } else {
                console.info("Error: Status is " + req.status);
            }
        }
    };
}


chrome.webRequest.onCompleted.addListener(function (details) {
    var objectId = DoRequest(details.url);
    
}, {
    urls: ["*://*.facebook.com/"]
});





