import express from 'express';
import http from 'http'; 
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import './config/db.js';

import { initializeSocket } from './Utils/soket.js'; // Import socket setup
import authRoute from './Routes/authRoute.js';
import postRoute from './Routes/postRoute.js';
import notificationRoutes from './Routes/notificationRoutes.js';
import followRoute from './Routes/followRoute.js';
import profileRoute from './Routes/profileRoute.js';

dotenv.config();

const app = express();
const server = http.createServer(app); // Create HTTP server

// Initialize Socket.IO with server
const io = initializeSocket(server); // Pass server directly here

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    methods: ['GET', 'POST'],
}));

// API Routes
app.use('/api/auth', authRoute);
app.use('/api/post', postRoute);
app.use('/api/notification', notificationRoutes);
app.use('/api/follow', followRoute);
app.use('/api/profile', profileRoute);

app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

const PORT = process.env.PORT || 5055;

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
