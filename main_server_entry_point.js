const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Initialize the Express application
const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse incoming JSON payloads

// Basic Health Check Route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the DonR API. The server is running securely.' });
});

// Define the port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});