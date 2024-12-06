const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const Redis = require("ioredis");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const redis = new Redis();

// Mock data storage (replace with Redis for production)
let rooms = {}; // { roomId: { players: [], scores: {} } }

// Matchmaking and Room Creation
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join_or_create_room", ({ username }) => {
    let room = Object.keys(rooms).find(
      (roomId) => rooms[roomId].players.length < 2
    );

    if (!room) {
      room = `room_${Date.now()}`;
      rooms[room] = { players: [], scores: {} };
    }

    socket.join(room);
    rooms[room].players.push({ id: socket.id, username });
    rooms[room].scores[socket.id] = 0;

    io.to(room).emit("room_update", { room, players: rooms[room].players });
    console.log(`User ${username} joined room: ${room}`);
  });

  // Real-time Updates for Player Movements and Actions
  socket.on("player_action", ({ room, action }) => {
    console.log(`Action received from ${socket.id} in room ${room}:`, action);
    io.to(room).emit("player_action_update", { playerId: socket.id, action });
  });

  // Scoring and Leaderboard Management
  socket.on("update_score", ({ room, score }) => {
    if (rooms[room] && rooms[room].scores[socket.id] != null) {
      rooms[room].scores[socket.id] += score;
      io.to(room).emit("score_update", { scores: rooms[room].scores });
    }
  });

  // Handle Disconnection
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    for (const room in rooms) {
      rooms[room].players = rooms[room].players.filter(
        (player) => player.id !== socket.id
      );
      delete rooms[room].scores[socket.id];

      if (rooms[room].players.length === 0) {
        delete rooms[room];
      } else {
        io.to(room).emit("room_update", { room, players: rooms[room].players });
      }
    }
  });
});

// Integrate with a Front-end Game Engine
app.get("/", (req, res) => {
  res.send("Backend is running! Connect via WebSockets.");
});

// Start the Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
