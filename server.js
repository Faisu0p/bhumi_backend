const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB } = require('./config/db');
const propertyRoutes = require('./routes/propertyRoutes');
const projectRoutes = require('./routes/projectRoutes');
const builderRoutes = require('./routes/builderRoutes');

dotenv.config();  // Load environment variables

// Validate required environment variables
if (!process.env.DB_SERVER) {
  throw new Error('The "DB_SERVER" environment variable is required and must be of type string.');
}

const app = express();

// Enable CORS
app.use(cors());  // Allow requests from all origins (customize if necessary)

// Middleware to parse incoming JSON requests
app.use(express.json());

// Connect to the database
connectDB();

// Basic test route
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// Use routes
app.use('/api/properties', propertyRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/builders', builderRoutes);

// General error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
