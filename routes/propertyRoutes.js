const express = require('express');
const { getAllProperties, getFilteredProperties, getPropertyById  } = require('../controllers/propertyController');
const router = express.Router();

// Route to get all properties
router.get('/', getAllProperties);

// Route to get filtered properties based on query
router.get('/filter', getFilteredProperties);

// Route to get property by ID
router.get('/:id', getPropertyById);

module.exports = router;
