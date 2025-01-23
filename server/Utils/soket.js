import { Server } from 'socket.io';

let io;
const users = {}; // Store user connections

// Initialize the Socket.IO server
export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5055", // Update with your frontend URL
      methods: ["GET", "POST"],
    },
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Register the user
    socket.on('register', (userId) => {
      users[userId] = socket.id;
      console.log(`User registered: ${userId}`);
    });

    // Handle sending notifications
    socket.on('send_notification', ({ recipientId, message }) => {
      const recipientSocketId = users[recipientId];
      if (recipientSocketId) {
        io.to(recipientSocketId).emit('notification', { message });
      } else {
        console.log(`User ${recipientId} is not online`);
      }
    });

    // Cleanup on disconnect
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
      for (const userId in users) {
        if (users[userId] === socket.id) {
          delete users[userId];
          break;
        }
      }
    });
  });
};

// Emit notification to a specific user (helper function)
export const sendNotification = (recipientId, message) => {
  const recipientSocketId = users[recipientId];
  if (recipientSocketId) {
    io.to(recipientSocketId).emit('notification', { message });
  } else {
    console.log(`User ${recipientId} is not online`);
  }
};
