#!/usr/bin/env node
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3333;
const ROOT = path.join(__dirname, '..', 'dashboard');

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  const pathname = new URL(req.url, `http://localhost:${PORT}`).pathname;
  let filePath = path.join(ROOT, pathname === '/' ? 'index.html' : pathname);
  const ext = path.extname(filePath);

  // CORS for local dev
  res.setHeader('Access-Control-Allow-Origin', '*');

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Dashboard server running at http://localhost:${PORT}`);
});
