const net = require('net');

let connection = net.connect({port: 3001}, () => {
    console.log('connection established');
})

let arr = [1,2,3,4,5]

for (const i of arr) {
    connection.write(i+'', (err) => {
        
        if(err)
            console.log(err.message);
    });
}

connection.end()