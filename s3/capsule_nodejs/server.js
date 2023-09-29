
//url : localhost:8080

let http = require('http');
let fs = require('fs');
let url = require('url');

let server = http.createServer();

server.on('request', (request, response) => {

    response.writeHead(200, {
        'Content-type': 'text/html; charset=utf-8'
    });

    let query = url.parse(request.url, true).query;
    let name = query.name === undefined ? 'toi' : query.name;

    fs.readFile('index.html', 'utf-8', (err, data) => {
        if(err) {
            response.writeHead(404, {
                'Content-type': 'text/html; charset=utf-8'
            });
            response.end('Ce fichier n\'existe pas.');
        }
        else{
            response.writeHead(200, {
                'Content-type': 'text/html; charset=utf-8'
            });
            data = data.replace('{{ name }}', name);
            response.end(data);
        }
    })
})
server.listen(8080);




// Short example :
/*
let http = require('http')

http.createServer(('request', (request, response) => {
    response.writeHead(200, {
        'Content-type': 'text/html; charset=utf-8'
    })
    response.end('Salut ! Ça va ?')
})).listen(8080)
*/