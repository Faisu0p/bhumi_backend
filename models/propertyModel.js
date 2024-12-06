const mssql = require('mssql');
const { dbConfig } = require('../config/db');

// Function to get all properties
const getAllProperties = async () => {
  let pool;
  try {
    pool = await mssql.connect(dbConfig);
    const result = await pool.request().query('SELECT * FROM Properties');
    return result.recordset;
  } catch (err) {
    console.error('Error fetching properties:', err);
    throw err;
  }
};

// Function to get filtered properties based on search query
const getFilteredProperties = async (searchQuery) => {
  let pool;
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
    return result.recordset;
  } catch (err) {
    console.error('Error fetching filtered properties:', err);
    throw err;
  }
};

module.exports = { getAllProperties, getFilteredProperties };
