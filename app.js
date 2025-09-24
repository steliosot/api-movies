const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
const bodyParser = require('body-parser');

// Import routes
const movieRoutes = require('./routes/movies');

// Middleware
app.use(bodyParser.json());
app.use('/movies', movieRoutes);

// Home route
app.get('/', (req, res) => {
    res.send('You are in home');
});

// ✅ New Endpoints

// 1. Today’s date
app.get('/today', (req, res) => {
    const today = new Date().toLocaleDateString();
    res.json({ date: today });
});

// 2. Current time
app.get('/time', (req, res) => {
    const time = new Date().toLocaleTimeString();
    res.json({ time });
});

// 3. Server uptime
app.get('/uptime', (req, res) => {
    const uptimeSeconds = process.uptime();
    res.json({ uptime: `${Math.floor(uptimeSeconds)} seconds` });
});

// 4. Greeting
app.get('/greet/:name', (req, res) => {
    const name = req.params.name;
    res.json({ message: `Hello, ${name}! Welcome to the API.` });
});

// MongoDB connection
mongoose.connect(process.env.DB_CONNECTOR, () => {
    console.log('Connected to MongoDB');
});

// Start server
app.listen(3000, () => {
    console.log('Server is up and running');
});
