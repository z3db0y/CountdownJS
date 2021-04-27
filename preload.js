let countr;
let timeStr = "";
let srvP = 690;
let tries = 10;
let srv = require('express')();
let Timer = { h: undefined, m: undefined, s: undefined };

srv.listen(srvP).on('error', (e) => {
    restartServer();
});

function restartServer() {
    tries -= 1;
    if(tries < 1) return document.querySelector('info').textContent = "Failed to start server!";
    srvP += 1;
    srv.listen(srvP).on('error', (e) => restartServer() );
}

    srv.get('/serverside.js', (req, res) => {
        res.sendFile(__dirname + '/serverside.js');
    });


function run() {
    srv.get('/', (req, res) => {
        if(timeStr === "") res.send('<script src="./serverside.js"></script><title>Countdown (by z3db0y)</title>\n<h1>Server OK</h1><style>@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap");\nh1 { font-family: "Poppins"; font-size: 500%; }\nbody { margin: 0; }</style>');
        else res.send(`<script src="./serverside.js"></script><title>Countdown (by z3db0y)</title>\n<h1>${timeStr}</h1><style>@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap");\nh1 { font-family: "Poppins"; font-size: 500%; }\nbody { margin: 0; }</style>`);
    });

    let timer = document.getElementById('timer');
    let start = document.getElementById('init');
    let inputs = document.querySelectorAll('#in input');

    document.querySelector('info').textContent = "Server running on port " + srvP;

    inputs[0].addEventListener('change', () => {
        let val0 = parseInt(inputs[0].value);
        let val1 = parseInt(inputs[1].value);
        let val2 = parseInt(inputs[2].value);
        if(val0 < 0 || isNaN(val0)) {
            inputs[0].value = 0;
            if(val1 == 0 && val2 == 0) inputs[2].value = 1;
        }
        else if(val0 == 0) if(val1 == 0 && val2 == 0) inputs[2].value = 1;
        else if(val0 > 24) inputs[0].value = 24;
    });

    inputs[1].addEventListener('change', () => {
        let val0 = parseInt(inputs[0].value);
        let val1 = parseInt(inputs[1].value);
        let val2 = parseInt(inputs[2].value);
        if(val1 < 0 || isNaN(val1)) {
            inputs[1].value = 0;
            if(val0 == 0 && val2 == 0) inputs[2].value = 1;
        }
        else if(val1 == 0) if(val0 == 0 && val2 == 0) inputs[2].value = 1;
        else if(val1 > 59) inputs[1].value = 59;
    });

    inputs[2].addEventListener('change', () => {
        let val0 = parseInt(inputs[0].value);
        let val1 = parseInt(inputs[1].value);
        let val2 = parseInt(inputs[2].value);
        if(val0 > 0 || val1 > 0) {
            if(val2 < 0 || isNaN(val2)) inputs[2].value = 0;
            else if(val2 > 59) inputs[2].value = 59;
        }
        else {
            if (inputs[2].value < 1 || isNaN(parseInt(inputs[2].value))) inputs[2].value = 1;
            else if(inputs[2].value > 59) inputs[2].value = 59;
        }
    });

    start.onclick = () => {
        resetCountr(timer);
        let cH = parseInt(inputs[0].value);
        let cM = parseInt(inputs[1].value);
        let cS = parseInt(inputs[2].value);
        if((isNaN(cH) || cH < 0 || cH > 24) || (isNaN(cM) || cM < 0 || cM > 59) || (isNaN(cS) || ((cM != 0 || cH != 0) && (cS < 0 || cS > 59)) || ((cM == 0 && cH == 0) && (cS < 1 || cS > 59)))) return alert('Invalid time provided!');

        c = (cS * 1000) + (cM * 1000 * 60) + (cH * 1000 * 60 * 60);

        count(c, timer);
    };
}



let init = setInterval(() => {
    if(document.body) {
        clearInterval(init);
        run();
    }
}, 500);

function resetCountr(timer) {
    if(countr == undefined || countr == null) return;
    timeStr = "";
    Timer = { h: undefined, m: undefined, s: undefined };
    timer.textContent = "";
    clearInterval(countr);
}

function count(c, timer) {
    let end = new Date();
    end.setTime(end.getTime()+c);
    countr = setInterval(() => {
        let d = end - new Date().getTime();
        let h = Math.floor(d / (1000 * 60 * 60));
        let m = Math.floor(d % (1000 * 60 * 60) / (1000 *60));
        let s = Math.floor(d % (1000 * 60) / 1000);

        Timer.h = h;
        Timer.m = m;
        Timer.s = s;
        timeStr = "";
        console.log(h + " " + m + " " + s);

        if(h <= 0 && m <= 0 && s <= 0) resetCountr(timer);
        else if(h <= 0 && m <= 0)  timeStr = s + "s";
        else if(h <= 0) timeStr = m + "m " + s + "s";
        else timeStr = h + "h " + m + "m " + s + "s";

        timer.textContent = timeStr;
    }, 500);
};