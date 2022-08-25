const http = require('http');

const app = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin': 'http://127.0.0.1:7001',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': '*',
  });

  let index = 1;
  const timer = setInterval(() => {
    if (index < 50) {
      // 每次 write 都会立刻传给前端
      res.write(`line: ${index}\n`);
      index += 1;
    } else {
      res.end('end');
      clearInterval(timer);
    }
  }, 100);
});

app.listen(3000, '127.0.0.1');
console.log('Node server running on port 3000');
