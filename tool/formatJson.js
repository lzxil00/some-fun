let processGlobalData = {
    "sessionid": -1,
    "isPreload": false,
    "rank": 0,
}

function formatJson(json) {
    let type = Object.prototype.toString.call(json), returnJson = {};
    if ("[object Object]" === type) {
        let key;
        let keyList = [];
        for (key in json) {
            keyList.push(key);
        }
        keyList.sort();
        for (key in keyList) {
            key = keyList[key];
            let childJson = json[key];
            returnJson[key] = formatJson(childJson);
        }
        return returnJson;
    }
    if ("[object Array]" === type) {
        let returnArray = [];
        type = Object.prototype.toString.call(json[0]);
        if ("[object String]" === type || "[object Number]" === type) {
            json.sort();
            return json;
        }
        for (let l = 0; l < json.length; l++)
            returnArray.push(formatJson(json[l]));
        return returnArray
    }
    return json;
}


console.log(formatJson(processGlobalData, 1))