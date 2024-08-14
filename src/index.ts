import "reflect-metadata";
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { initializeDataSource } from "./db/data-source";
import appRouter from "./routes";
import { dmSocket } from "./sockets/dm.sockets";
import { MessageService } from './services/messageService'; // Import MessageService

const app = express();
const server = createServer(app);
const io = new Server(server);
const port = 3000;
let messageService: MessageService;
async function startServer() {
  // Initialize data source before anything else
  await initializeDataSource();
  messageService = new MessageService(); // Create an instance of MessageService

  // Set up Socket.IO with MessageService
  io.on('connection', (socket) => {
    console.log('a user connected');
    dmSocket(io, messageService); // Pass the MessageService instance to dmSocket
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  app.use(express.json()); // Add this line to parse the request body
  const commonPath = '/api';
  app.use(commonPath, appRouter);
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

startServer().catch((err) => {
  console.error("Error starting server:", err);
});
