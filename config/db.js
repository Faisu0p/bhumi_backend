const mssql = require('mssql');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// SQL Server connection configuration
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,  // Ensure this is correctly formatted (use double backslashes if needed)
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true,  // Use encryption for Azure SQL
    trustServerCertificate: true,  // Set to true for local development
  },
};

// Function to connect to the database
const connectDB = async () => {
  try {
    await mssql.connect(dbConfig);
    console.log('Connected to SQL Server');
  } catch (err) {
    console.error('Error connecting to SQL Server:', err);
    process.exit(1);  // Exit process if DB connection fails
  }
};

// Export the connection configuration and connect function
module.exports = { dbConfig, connectDB };
