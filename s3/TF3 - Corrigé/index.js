const https = require('https');
const fs = require('fs');
const createPdf = require("./create-pdf");

https.get({
    hostname: process.env.host,
    path: '/tp1/users'
}, r1 => {

    let data = '';

    // A chunk of data has been recieved.
    r1.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    r1.on('end', () => {
        let users = JSON.parse(data);
        let i = process.argv.indexOf('-o');
        let stream = process.stdout;
        if (i > 0) {
            stream = fs.createWriteStream(process.argv[i + 1]);
        }
        createPdf(users, stream);
    });
}).on("error", err => {
    console.log("Error: " + err.message);
});