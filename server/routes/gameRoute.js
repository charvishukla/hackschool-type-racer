const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.post('/game', gameController.createGame);
router.get('/game/:id', gameController.getGame);

module.exports = router;