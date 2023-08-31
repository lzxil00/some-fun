const getList = () => fetch("https://code.byted.org/_/api/v1/search/pipelines?repo_id=174067&branch=chore%2Flzx%2Ffe-shared-alias&status=completed&actor=&per_page=150&page=1", {
    "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "zh,zh-TW;q=0.9,zh-CN;q=0.8,en;q=0.7",
        "cache-control": "no-cache",
        "pragma": "no-cache",
        "sec-ch-ua": "\"Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"115\", \"Chromium\";v=\"115\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin"
    },
    "referrer": "https://code.byted.org/ies/tiktok_web_monorepo/+/pipelines?branch=chore%2Flzx%2Ffe-shared-alias&status=completed&actor=",
    "referrerPolicy": "origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "include"
});

const successList = [];
getList().then(res => res.json()).then(json => {
    pipelines = json.pipelines;
    pipelines.forEach(item => {
        if (item.conclusion !== 'success') {
            console.log(`${item.id}-${item.name}: ${item.conclusion}, 开始时间：${item.started_at}`)
        } else {
            successList.push(item.name);
        }
    })
    console.log(`已成功的包：${successList.join(',')}`)
})

