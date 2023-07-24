const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.post('/game', gameController.createGame);
router.get('/game/:id', gameController.getGame);
router.put('/game/:id', gameController.updateGame);

module.exports = router;