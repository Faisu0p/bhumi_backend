const sql = require('mssql');
const { dbConfig } = require('../config/db.js');
// Define the function to add a builder
const addBuilder = async (data) => {
  try {
    const pool = await sql.connect(process.env.DB_CONNECTION_STRING);
    const result = await pool.request()
      .input('city', sql.VarChar, data.city)
      .input('fullName', sql.VarChar, data.fullName)
      .input('shortName', sql.VarChar, data.shortName)
      .input('yearsInRealEstate', sql.Int, data.yearsInRealEstate)
      .input('shortDescription', sql.Text, data.shortDescription)
      .input('projects', sql.Text, data.projects)
      .query(`
        INSERT INTO Add_Builders (city, fullName, shortName, yearsInRealEstate, shortDescription, projects)
        VALUES (@city, @fullName, @shortName, @yearsInRealEstate, @shortDescription, @projects);
      `);

    return result.recordset;
  } catch (err) {
    console.error("Error adding builder:", err);
    throw new Error('Error inserting builder data');
  }
};


// Fetch builder names and IDs from Add_Builders table
const getBuilders = async () => {
  try {
    const pool = await sql.connect(process.env.DB_CONNECTION_STRING);
    
    const result = await pool.request().query(`
      SELECT builder_id, fullName FROM Add_Builders;
    `);

    // Return the result as an array of objects
    return result.recordset;
  } catch (err) {
    console.error("Error fetching builders:", err);
    throw new Error('Error fetching builders');
  }
};



// Define the function to verify a builder
const verifyBuilder = async (fullName) => {
  try {
    const pool = await sql.connect(process.env.DB_CONNECTION_STRING);

    const result = await pool.request()
      .input('fullName', sql.VarChar, fullName)
      .query(`
        UPDATE Add_Builders
        SET isVerified = 1
        WHERE fullName = @fullName;
      `);

    return result.rowsAffected[0] > 0; // Return true if at least one row was updated
  } catch (err) {
    console.error("Error verifying builder:", err);
    throw new Error('Error updating builder verification status');
  }
};



module.exports = { addBuilder, getBuilders, verifyBuilder };