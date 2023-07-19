console.log("loading game schema ...")
const mongoose = require('mongoose');

const Schema = mongoose.Schema
const GameModel = new Schema({
    timeRemaining: {
        Number
    },
    characters: {
        Number
    },
    userInput: {
        String
    },
    accuracy : {
        Number
    },
    wpm:{
        Number
    }
})


module.exports = mongoose.model('Game',GameModel)