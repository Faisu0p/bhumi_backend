const mssql = require('mssql'); // Add this line at the top if it's missing
const dbConfig = require('../config/db'); // Adjust path if necessary

const projectModel = require('../models/projectModel');


// Controller to get all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await projectModel.getAllProjects();
    res.status(200).json(projects);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ message: 'Error fetching projects' });
  }
};

const getProjectById = async (req, res) => {
  const projectId = req.params.id; // Get the project ID from the request params

  try {
    if (!projectId) {
      return res.status(400).json({ message: 'Project ID is required' }); // Validate the input
    }

    // Use the global pool connection if the server is already connected
    const request = new mssql.Request();

    // Fetch project details using a parameterized query
    const result = await request
      .input('id', mssql.Int, projectId)
      .query('SELECT * FROM Projects WHERE id = @id');

    // Check if the project exists in the database
    if (result.recordset.length > 0) {
      return res.status(200).json(result.recordset[0]); // Return the project details
    } else {
      return res.status(404).json({ message: 'Project not found' }); // Handle not found
    }
  } catch (err) {
    // Enhanced error handling for database-related issues
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection refused:', err);
      return res.status(503).json({ message: 'Database connection refused, please try again later' });
    }

    console.error('Error fetching project:', err);
    return res.status(500).json({ message: 'An unexpected error occurred while fetching the project' });
  }
};



module.exports = { getAllProjects, getProjectById };
