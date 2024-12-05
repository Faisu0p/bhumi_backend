const express = require('express');
const mssql = require('mssql');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();  // Load environment variables

const app = express();

// Enable CORS
app.use(cors());  // Allow requests from all origins (customize if necessary)

// SQL Server connection configuration
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true,  // Use encryption if you're using Azure SQL
    trustServerCertificate: true,  // Set this to true for local development
  },
};

// Test database connection
mssql.connect(dbConfig, (err) => {
  if (err) {
    console.log('Error connecting to SQL Server:', err);
  } else {
    console.log('Connected to SQL Server');
  }
});

// Middleware to parse incoming JSON requests
app.use(express.json());

// Basic test route
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// Route to fetch property data from the database
app.get('/api/properties', async (req, res) => {
  let pool;
  try {
    pool = await mssql.connect(dbConfig);
    const result = await pool.request().query('SELECT * FROM Properties');
    res.status(200).json(result.recordset);  // Return the result as JSON
  } catch (err) {
    console.error('Error fetching properties:', err);
    res.status(500).json({ message: 'Error fetching properties' });
  } finally {
    if (pool) {
      pool.close(); 
    }
  }
});


//filter
app.get('/api/properties', async (req, res) => {
  let pool;
  const searchQuery = req.query.q || ''; // Get the search query from the request

  try {
    pool = await mssql.connect(dbConfig);
    const query = `
      SELECT * FROM Properties
      WHERE 
        name LIKE @searchQuery OR
        location LIKE @searchQuery
    `;
    const result = await pool
      .request()
      .input('searchQuery', mssql.VarChar, `%${searchQuery}%`)
      .query(query);

    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('Error fetching properties:', err);
    res.status(500).json({ message: 'Error fetching properties' });
  } finally {
    if (pool) {
      pool.close();
    }
  }
});





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
