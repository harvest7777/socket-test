import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

// Initialization
const app = express();
const server = createServer(app);
const io = new Server(server);

// Current path 
const __dirname = dirname(fileURLToPath(import.meta.url));

// Join the directory name to get public folder path
// This includes html, css, and js files
app.use(express.static(join(__dirname, 'public')));

// If on home page, send over index.html for viewing
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

// io is the server socket is the connection
io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('disconnect', () => {
        console.log('a user disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
      });
});

io.on('connection', (socket) => {

  });

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});