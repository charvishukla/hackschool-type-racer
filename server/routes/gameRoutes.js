console.log('Loading game router...');

const express = require('express');
const Game = require("../models/GameModel")
const {
    getTypeRacerData
} = require("../controllers/gameController")

const router = express.Router();
router.get('/game', getTypeRacerData); 

module.exports = router;