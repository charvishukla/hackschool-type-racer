// routes/sentenceRoutes.js 
console.log("Getting sentence routes ...")
const express = require('express');
const router = express.Router();
const inputSentenceController = require('../controllers/sentenceController'); 

router.get('/allsentences', inputSentenceController.getAllInputSentences);
router.get('/sentence/:id', inputSentenceController.getInputSentenceById);
router.post('/sentence', inputSentenceController.createInputSentence);


module.exports = router;