const express = require("express");
const electron = require("electron");
const child_process = require("child_process");
const net = require("net");
const { app, BrowserWindow, ipcMain } = electron;

const expressApp = express();
let statsData = {}
let main;

// middleware setup
expressApp.use(express.json({ limit: "50mb" }));
expressApp.use(express.urlencoded({ limit: "50mb", extended: true }));

// routes
expressApp.post("/videoFrame", (req, res) => {
  main.webContents.send("frame", req.body.frame);
  res.status(200).json({
    status: "success",
  });
});

expressApp.route("/stats")
    .post((req, res) => {
            statsData = req.body.stats
            res.status(200).json({
                status: "success",
            });
    }).get((req, res) => {
        res.status(200).json({
                status: "success",
                statsData
            });
    })

let droneConnection;
let connectionFlag = false;

const startServerClient = (setupObject) => {
  console.log(`running at port ${setupObject.port}`);

  const python = child_process.spawn("python3", [
    `${__dirname}/../drone-engine/main.py`,
    setupObject.speed,
    setupObject.movementSensitivity,
    setupObject.turnSensitivity,
    setupObject.port,
  ]);

    python.stdout.on('data', (chunk) => {
      if (chunk.toString('utf8') == 'init')
        droneConnection = net.connect({ port: setupObject.port + 1}, (err) => {
          connectionFlag = true;
          main.loadURL(`file://${__dirname}/../../frontend/main/dashboard.html`);
        });
    })
};

app.on("ready", () => {
  main = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  main.loadURL(`file://${__dirname}/../../frontend/main/setup.html`);
  
  ipcMain.on("config:data", (event, data) => {
    expressApp.listen(data.port, () => startServerClient(data));
  })

  ipcMain.on("keyboard:event", (event, data) => {
    if (connectionFlag) {
      droneConnection.write(data + "", (err) => {
        if (err) console.log(err.message);
      });
    }
  });
  
});
