const express = require('express');
const router = express.Router();
const builderController = require('../controllers/builderController');

// POST route to add a builder
router.post('/add', builderController.addBuilder);

// GET route to fetch builder names and IDs
router.get('/', builderController.getBuilders);

// POST route to verify a builder
router.post('/verify', builderController.verifyBuilder);


module.exports = router;
