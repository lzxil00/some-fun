let count = 0;
const delay = (time) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, time);
    });
};

const DELAY_TIME = 500

const playMusic = () => {
    const music = 'https://downsc.chinaz.net/Files/DownLoad/sound1/202007/13195.mp3'; // 提示音乐
    let audio = new Audio(music);
    audio.muted = false;
    audio.play();
}

const checkTicket = async () => {
    count++;
    await delay(DELAY_TIME * 2);
    return new Promise((resolve, reject) => {
        fetch('https://pcticket.cstm.org.cn/prod-api/pool/getPriceByScheduleId?hallId=1&openPerson=1&queryDate=2023%2F07%2F26&saleMode=1&scheduleId=23', {
            credentials: 'same-origin',
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImQxYWQyMTZhLTc4YzEtNDgxOC1iNTA5LWVmNDc0MTMxZmIwZCJ9.82p5SzgWpmSXVkPFt-RRKTHY_ob4YDbZWN_pD7pLvqGdDVD18Zeh8isIfEzEPEuJp66gBKB4hU009M1J5LumSg`
            }
        }).then(res => res.json()).then(json => {
            if (json?.data?.[0]?.ticketPool > 0 || json?.data?.[1]?.ticketPool > 0) {
                console.log(`查询第${count}次，有票！`)
                resolve();
            } else {
                console.log(`查询第${count}次，暂时无票`)
                reject();
            }
        }).catch(e => {
            console.log(`查询第${count}次，查询失败，原因：`, e)
        })
    })
}

const autoCheck = (globalResolve) => {
    return new Promise(resolve => {
        checkTicket().then(() => {
            globalResolve ? globalResolve() : resolve()
        }).catch(() => {
            return autoCheck(globalResolve || resolve)
        })
    })
}

const main = async () => {
    await delay(DELAY_TIME * 2);
    await autoCheck();

    await delay(DELAY_TIME);
    const input = document.querySelector('#app > div.fill_info > div.panel > div.edit > div.el-table.el-table--fit.el-table--enable-row-hover.el-table--enable-row-transition > div.el-table__body-wrapper.is-scrolling-none > table > tbody > tr > td.el-table_1_column_2.el-table__cell > div > div > div.el-input.el-input--suffix > input');
    input.click();

    await delay(DELAY_TIME);
    const li = document.querySelector('body > div.el-select-dropdown.el-popper > div.el-scrollbar > div.el-select-dropdown__wrap.el-scrollbar__wrap > ul > li');
    li.click();

    await delay(DELAY_TIME);
    const label_people = document.querySelector('#app > div.fill_info > div.panel > div.contact > div > label:nth-child(2)');
    label_people.click();

    await delay(DELAY_TIME);
    const input_type = document.querySelector('#app > div.fill_info > div.panel > div.edit > div.el-table.el-table--fit.el-table--enable-row-hover.el-table--enable-row-transition > div.el-table__body-wrapper.is-scrolling-none > table > tbody > tr > td.el-table_1_column_6.el-table__cell > div > div > div > input');
    input_type.click();

    await delay(DELAY_TIME);
    const li_tick = document.querySelector('body > div:nth-child(7) > div.el-scrollbar > div.el-select-dropdown__wrap.el-scrollbar__wrap > ul > li:nth-child(1) > span:nth-child(2)');
    li_tick.click();
}

const result = main();
console.log(result)