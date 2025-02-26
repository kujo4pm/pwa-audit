const http = require('http');
console.log('Starting server...');
http.createServer((req, res) => {
  console.log('Responding to request...')
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify({
    header: true,
  }));
  res.end();
}).listen(8081);