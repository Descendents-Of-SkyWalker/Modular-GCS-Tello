const express = require('express');
const fs = require('fs');

const app = express();

// middleware setup
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended: true}));


// routes
app.post('/videoFrame', (req, res) => {
    fs.writeFile('sample.jpg', req.body.frame, 'base64', (err, data) => {
        if (!err){
            res.status(200).json({
            status: 'success'
        });
        }
    });
});

app.post('/stats', (req, res) => {
    fs.writeFile('stats.json', req.body.stats, 'utf8', (err, data) => {
        if (!err){
            res.status(200).json({
            status: 'success'
        });
        }
    });
});

const port = 3000
app.listen(port, () => {
    console.log(`running at port ${port}`);
});