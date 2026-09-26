import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon' };
const server = http.createServer(async (req, res) => {
  // This server is local to this computer and serves only the production build.
  if (req.headers.host !== '127.0.0.1:4178') {
    res.writeHead(403).end();
    return;
  }
  if (req.url === '/__wild_atlas_health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' }).end('wild-atlas-local-v1');
    return;
  }
  if (req.url === '/__wild_atlas_stop' && req.method === 'POST' && req.headers['x-wild-atlas-launcher'] === 'stop' && !req.headers.origin) {
    res.end('Stopped');
    server.close();
    server.closeIdleConnections();
    return;
  }
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405).end();
    return;
  }
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://127.0.0.1:4178').pathname);
    const target = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    const relative = path.relative(root, target);
    if (relative.startsWith('..') || path.isAbsolute(relative)) {
      res.writeHead(403).end();
      return;
    }
    const content = await readFile(target);
    res.writeHead(200, { 'Content-Type': types[path.extname(target)] || 'application/octet-stream', 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' });
    res.end(req.method === 'HEAD' ? undefined : content);
  } catch {
    res.writeHead(404).end('Not found');
  }
});
server.on('error', () => process.exit(1));
server.listen(4178, '127.0.0.1');
