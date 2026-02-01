import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { networkInterfaces } from "node:os";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const dev = process.env.NODE_ENV !== "production";
const hostname = "0.0.0.0"; // Bind to all network interfaces
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const __dirname = dirname(fileURLToPath(import.meta.url));
const MESSAGES_FILE = join(__dirname, "app/data/messages.json");

// Save messages to JSON file
function saveMessages(messages) {
  writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), "utf-8");
}

// Get conversation ID from two user IDs
function getConversationId(user1, user2) {
  const id1 = parseInt(user1);
  const id2 = parseInt(user2);
  return `${Math.min(id1, id2)}_${Math.max(id1, id2)}`;
}

// Start with empty messages (cleared on each server restart)
let messages = {};

// Helper to get local IP address
function getLocalIpAddress() {
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip internal (loopback) and non-IPv4 addresses
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost';
}

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  const userSockets = new Map(); // userId -> socketId

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("join", (userId) => {
      userSockets.set(userId, socket.id);
      socket.userId = userId;
      console.log(`User ${userId} joined with socket ${socket.id}`);
    });

    socket.on("send_message", ({ to, message }) => {
      console.log(`Message from ${socket.userId} to ${to}:`, message);

      const timestamp = Date.now();
      const messageId = timestamp;
      const conversationId = getConversationId(socket.userId, to);

      // Save message to persistent storage
      if (!messages[conversationId]) {
        messages[conversationId] = [];
      }

      const messageObj = {
        id: messageId,
        from: socket.userId,
        to: to,
        text: message,
        timestamp: timestamp
      };

      messages[conversationId].push(messageObj);
      saveMessages(messages);

      // Send to recipient
      const recipientSocketId = userSockets.get(to);
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("receive_message", {
          from: socket.userId,
          message,
          timestamp: timestamp,
          id: messageId
        });
      }

      // Confirm to sender
      socket.emit("message_sent", {
        id: messageId,
        timestamp: timestamp
      });
    });

    socket.on("get_messages", ({ otherUserId }) => {
      const conversationId = getConversationId(socket.userId, otherUserId);
      const history = messages[conversationId] || [];
      socket.emit("messages_history", history);
    });

    socket.on("get_all_last_messages", () => {
      const lastMessages = {};

      for (const [conversationId, msgs] of Object.entries(messages)) {
        if (msgs.length > 0) {
          const lastMsg = msgs[msgs.length - 1];
          lastMessages[conversationId] = {
            text: lastMsg.text,
            timestamp: lastMsg.timestamp
          };
        }
      }

      socket.emit("all_last_messages", lastMessages);
    });

    socket.on("disconnect", () => {
      if (socket.userId) {
        console.log(`User ${socket.userId} disconnected`);
        userSockets.delete(socket.userId);
      }
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, hostname, () => {
      const localIp = getLocalIpAddress();
      console.log(`\n> Ready on:`);
      console.log(`  - Local:   http://localhost:${port}`);
      console.log(`  - Network: http://${localIp}:${port}\n`);
      console.log(`> To access from other devices on your network, use the Network URL\n`);
    });
});
