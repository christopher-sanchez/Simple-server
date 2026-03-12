/*import http from 'http';

const PORT = 3000;

// step 1

const server = http.createServer((req, res) => { 
    console.log(`${req.method} ${req.url}`);
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end('<h1>Hello World</h1>');
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
*/

// step 2
const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Home Page</h1>');
    }
    else if (url === '/about' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>About Page</h1>');
    }
    else if(url ==='/api/data' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({message:'Hello',timestamp: Date.now()}));
    }
    else{
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
    }
});

import http from 'http';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function serveFile(filePath,contentType, res) {
    try {
        const data = await fs.readFile(filePath);
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    } catch (error) {
        res.wrtiteHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
    }
}


