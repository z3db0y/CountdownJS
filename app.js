const { app, BrowserWindow } = require('electron');
const colors = require('colors');

function init() {
    let win = new BrowserWindow({
        width: 800,
        height: 450,
        show: false,
        resizable: false,
        title: "Countdown v" + require('./package.json').version,
        icon: './icon.ico',
        webPreferences: {
            preload: __dirname + '/preload.js'
        }
    });
    win.setMenu(null);
    win.loadFile('index.html');

    win.on('ready-to-show', win.show);

    win.webContents.on('console-message', (e, level, msg) => {
        //if(level != 1) return
        console.log(colors.green("[" + (new Date().getHours() < 10 ? "0" + new Date().getHours() : new Date().getHours()) + ":" + (new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes()) + ":" + (new Date().getSeconds() < 10 ? "0" + new Date().getSeconds() : new Date().getSeconds()) + "]") + " " + msg);
    });
}

app.whenReady().then(init);