// routes/gameRoutes.js
const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// Define routes
router.get('/game', gameController.getGameStats);
router.post('/game', gameController.createGameStats);
router.put('/game/:id', gameController.updateGameStats);

module.exports = router;