import "reflect-metadata";
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { initializeDataSource } from "./db/data-source";
import appRouter from "./routes";

const app = express();
const server = createServer(app);
const io = new Server(server);
const port = 3000;

async function startServer() {
  await initializeDataSource();

  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
  const commonPath ='/api'
  app.use(commonPath,appRouter)
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