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
/*
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
*/

const server = http.createServer(async (req, res) => {
    const url = req.url;

    if (url === '/' || url === '/index.html') {
        await serveFile(path.join(__dirname, 'public', 'index.html'), 'text/html', res);
    }
    else if (url === '/about') {
        await serveFile(path.join(__dirname, 'public', 'about.html'), 'text/html', res);
    }
    else if (url === '/style.css') {
        await serveFile(path.join(__dirname, 'public', 'style.css'), 'text/css', res);
    }
    else if (url.startsWith('/images/')) {
        const ext = path.extname(url);
        const contentType = ext === '.png' ? 'image/png' : 'image/jpeg';
        await serveFile(path.join(__dirname, 'public', url), contentType, res);
    }
    else if (url === '/api/data') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Hello!', time: new Date().toISOString() }));
    }
    else if (url === '/api/contact' && req.method === 'POST') { 
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {                        
            try {
                const data = JSON.parse(body);
                console.log('Received:', data);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: true,
                    message: 'Data received!'          
                }));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });                                            
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
    }
});                                                   


