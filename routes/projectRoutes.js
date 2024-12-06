const express = require('express');
const { getAllProjects, getProjectById } = require('../controllers/projectController');
const router = express.Router();

// Route to get all projects
router.get('/', getAllProjects);
// Route to get project by ID
router.get('/:id', getProjectById);

module.exports = router;
