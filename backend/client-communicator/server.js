const express = require('express');
const electron = require('electron');
const child_process = require('child_process');
const net = require('net');
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
let droneConnection;
let connectionFlag = false;


const startServerClient = () => {
    console.log(`running at port ${port}`);
    const python = child_process.spawn('python3', ['backend/drone-engine/main.py', ]);

    setTimeout(() => {
        droneConnection = net.connect({port: 15001}, (err) => {
            connectionFlag = true;
            console.log('connected');
            console.log(err);
        });
    }, 10000);
}



let main;
app.on('ready', () => {
    main = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    // expressApp.listen(port, () => {startServerClient()});

    ipcMain.on("keyboard:event", (event, data) => {
        if(connectionFlag){
            droneConnection.write(data+'', (err) => {
                if(err)
                    console.log(err.message);
            });
        }
    });

    main.loadURL(`file://${__dirname}/../../frontend/main/dashboard.html`);


    setTimeout(() => {
    main.loadURL(`file://${__dirname}/../../frontend/index.html`);
    }, 2000)
});