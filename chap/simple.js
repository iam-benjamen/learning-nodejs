const http = require('http');
const fs = require('fs');
const _ = require('lodash')
// http.createServer(function(req, res){
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.end('Hello World!');
// }).listen(8080);

const num = _.random(0,20);
console.log(num);

const server = http.createServer((req, res) => {
    console.log(req.method, req.url);
    //set Header
    res.setHeader('Content-Type', 'text/html');
    let path = '/home/benjie/Documents/NODE/views/';

    switch(req.url){
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('location', '/about');
            res.end();
        default:
            path += '404.html';
            res.statusCode = 404;
            break
    }

    //sernd an hmtl from server
    fs.readFile(path, (err, data) => {
        if(err){
            console.log(err);
            res.end();
        }else{
            res.end(data);
        }
    });
});

server.listen(8080, 'localhost', () =>{
    console.log('listening for requests');
});
