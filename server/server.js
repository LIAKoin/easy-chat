import express from "express";
import { createServer } from "http";
import { Server as IOServer } from "socket.io";

const app = express();
const httpServer = createServer(app);

const io = new IOServer(httpServer, {
  cors: { origin: "*" },
});

const messages = [];

io.on("connection", (socket) => {
  console.log("✅ Пользователь подключился:", socket.id);

  socket.emit("history", messages);

  socket.on("message", (msg) => {
    messages.push(msg);
    socket.emit("message", msg);
    socket.broadcast.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("❌ Пользователь отключился:", socket.id);
  });
});

app.use(express.static("dist"));

const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
