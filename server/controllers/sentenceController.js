const inputSentence = require("../models/inputSentence");

exports.createInputSentence = async (req, res) => {
  try {
    const { sentence } = req.body;
    const newInputSentence = new inputSentence({ sentence });
    await newInputSentence.save();
    res.status(201).json(newInputSentence);
  } catch (error) {
    res
      .status(500)
      .json({ message: "error creating mongodb doc", error });
  }
};

exports.getAllInputSentences = async (req, res) => {
  try {
    const inputSentences = await inputSentence.find();
    res.json(inputSentences);
  } catch (error) {
    res.status(500).json({ message: "cant fetch sentences", error });
  }
};

exports.getInputSentenceById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundInputSentence = await inputSentence.findById(id);
    if (!foundInputSentence) {
      return res.status(404).json({ message: "sentence not found" });
    }
    res.json(foundInputSentence);
  } catch (error) {
    res
      .status(500)
      .json({ message: "cant get the sentence", error });
  }
};
