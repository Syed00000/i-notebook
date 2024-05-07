const express = require('express');
const cors = require('cors'); // Import cors module

// Create Express app
const app = express();
const port = 5000;

// Connect to MongoDB
const connectToMongo = require('./db');
async function main() {
    try {
        await connectToMongo();
       
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
main();

// Enable CORS for all routes
app.use(cors()); // Use cors middleware

// Parse JSON bodies
app.use(express.json());

// Define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Start the server
app.listen(port, () => {
    console.log(`i-Notebook backend listening on port ${port}`);
});
