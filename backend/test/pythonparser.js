const spawn = require('child_process').spawn;

const process = spawn('python3', ['test_process.py', 'Gaurav']);


process.stdout.on('data', (data) => {
    console.log(data.toString('utf8'));
})