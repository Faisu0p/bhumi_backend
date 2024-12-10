const express = require('express');
const { getAllProjects, getProjectById, addPropertyProject } = require('../controllers/projectController');
const router = express.Router();

// Route to get all projects
router.get('/', getAllProjects);
// Route to get project by ID
router.get('/:id', getProjectById);
// Route to add a new project
router.post('/add', addPropertyProject);



module.exports = router;