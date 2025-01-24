import express from 'express';
import bodyParser from 'body-parser'; // For parsing request bodies
import dotenv from 'dotenv';
import './config/db.js'; 
import authRoute from './Routes/authRoute.js'
import postRoute from './Routes/postRoute.js'
import notificationRoutes from './Routes/notificationRoutes.js';
import followRoute from './Routes/followRoute.js'
import cors from 'cors'
import profileRoute from './Routes/profileRoute.js'
dotenv.config(); 

const app = express(); 

// Middleware
app.use(bodyParser.json()); // To handle JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // To handle URL-encoded request bodies

app.use(cors());


app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

app.use('/api/auth', authRoute)
app.use('/api/post', postRoute )
app.use('/api/notification', notificationRoutes)
app.use('/api/follow', followRoute )
app.use('/api/profile', profileRoute)
const PORT = process.env.PORT || 5055;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
