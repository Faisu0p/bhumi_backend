const mssql = require('mssql');
const { dbConfig } = require('../config/db.js');

// Function to get all projects
const getAllProjects = async () => {
  let pool;
  try {
    pool = await mssql.connect(dbConfig);
    const result = await pool.request().query('SELECT * FROM Projects');
    return result.recordset;
  } catch (err) {
    console.error('Error fetching projects:', err);
    throw err;
  }
};

module.exports = { getAllProjects };
