const Builder = require('../models/builderModel');

// Controller function to add a builder
const addBuilder = async (req, res) => {
  try {
    const builderData = req.body;  // Extract form data from the request body
    const result = await Builder.addBuilder(builderData);
    res.status(201).json({
      message: 'Builder added successfully',
      data: result
    });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to add builder',
      error: err.message
    });
  }
};


// Controller function to fetch builder names
const getBuilderNames = async (req, res) => {
  try {
    // Fetch builder names from the Add_Builders table
    const builderNames = await Builder.getBuilderNames();
    
    // If no builders are found
    if (!builderNames || builderNames.length === 0) {
      return res.status(404).json({
        message: 'No builder names found'
      });
    }

    // Send builder names as response
    res.status(200).json({
      message: 'Builder names fetched successfully',
      data: builderNames
    });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to fetch builder names',
      error: err.message
    });
  }
};


// Controller function to verify a builder
const verifyBuilder = async (req, res) => {
  try {
    const { fullName } = req.body;  // Extract builder's full name from the request body
    
    // Ensure full name is provided
    if (!fullName) {
      return res.status(400).json({
        message: 'Builder name is required to verify'
      });
    }

    // Call the model function to verify the builder
    const isVerified = await Builder.verifyBuilder(fullName);
    
    if (isVerified) {
      return res.status(200).json({
        message: `Builder ${fullName} has been verified successfully`
      });
    } else {
      return res.status(404).json({
        message: 'Builder not found or update failed'
      });
    }
  } catch (err) {
    res.status(500).json({
      message: 'Failed to verify builder',
      error: err.message
    });
  }
};



module.exports = { addBuilder, getBuilderNames, verifyBuilder};
