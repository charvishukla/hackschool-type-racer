console.log("Loading inputSentence model...");
const mongoose = require('mongoose');
const sentenceSchema = new mongoose.Schema({
    sentence: {type: String}
})

const inputSentence = mongoose.model('inputSentence', sentenceSchema);


module.exports = inputSentence;