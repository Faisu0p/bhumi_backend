const mssql = require('mssql'); // Add this line at the top if it's missing
const dbConfig = require('../config/db'); // Adjust path if necessary

const propertyModel = require('../models/propertyModel');

// Controller to get all properties
const getAllProperties = async (req, res) => {
  try {
    const properties = await propertyModel.getAllProperties();
    res.status(200).json(properties);
  } catch (err) {
    console.error('Error fetching properties:', err);
    res.status(500).json({ message: 'Error fetching properties' });
  }
};

// Controller to get filtered properties based on query
const getFilteredProperties = async (req, res) => {
  const searchQuery = req.query.q || '';
  try {
    const filteredProperties = await propertyModel.getFilteredProperties(searchQuery);
    res.status(200).json(filteredProperties);
  } catch (err) {
    console.error('Error fetching filtered properties:', err);
    res.status(500).json({ message: 'Error fetching filtered properties' });
  }
};




const getPropertyById = async (req, res) => {
  const propertyId = req.params.id; // Get the property ID from the request params

  try {
    if (!propertyId) {
      return res.status(400).json({ message: 'Property ID is required' }); // Validate the input
    }

    // Use the global pool connection if the server is already connected
    const request = new mssql.Request();

    // Fetch property details using a parameterized query
    const result = await request
      .input('id', mssql.Int, propertyId)
      .query('SELECT * FROM Properties WHERE id = @id');

    // Check if the property exists in the database
    if (result.recordset.length > 0) {
      return res.status(200).json(result.recordset[0]); // Return the property details
    } else {
      return res.status(404).json({ message: 'Property not found' }); // Handle not found
    }
  } catch (err) {
    // Enhanced error handling for database-related issues
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection refused:', err);
      return res.status(503).json({ message: 'Database connection refused, please try again later' });
    }

    console.error('Error fetching property:', err);
    return res.status(500).json({ message: 'An unexpected error occurred while fetching the property' });
  }
};



module.exports = { getAllProperties, getFilteredProperties, getPropertyById };