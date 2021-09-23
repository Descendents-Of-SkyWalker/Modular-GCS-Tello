const express = require('express');
const electron = require('electron');
const process = require('child_process')
const {app, BrowserWindow, ipcMain} = electron;


const expressApp = express();

// middleware setup
expressApp.use(express.json({limit: '50mb'}));
expressApp.use(express.urlencoded({limit: '50mb',extended: true}));


// routes
expressApp.post('/videoFrame', (req, res) => {
    main.webContents.send('frame', req.body.frame);
    res.status(200).json({
        status: 'success'
    });
});

expressApp.post('/stats', (req, res) => {
    fs.writeFile('stats.json', req.body.stats, 'utf8', (err, data) => {
        if (!err){
            res.status(200).json({
            status: 'success'
        });
        }
    });
});

const port = 15000



let main;
app.on('ready', () => {
    main = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    expressApp.listen(port, () => {
        console.log(`running at port ${port}`);
    });
    main.loadURL(`file://${__dirname}/../../frontend/index.html`);
});