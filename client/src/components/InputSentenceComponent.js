import React, {useState} from "react";
import axios from "axios";


const InputSentenceComponent =  () =>  {
    const [sentence, setSentence] = useState(""); // make a default empty string state to avoid getting undefined objs 

    const handleInputChange = (event) => {
        setSentence(event.target.value);
      } 



    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          await axios.post("http://localhost:5000/sentenceBank/sentence", {
            sentence,
          });
          console.log("Sentence successfully submitted!");
          // Optionally, you can reset the input field after successful submission
          setSentence("");
        } catch (error) {
          console.error("Failed to submit sentence:", error);
        }
      };




  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Input Sentence:
          <input
            type="text"
            value={sentence}
            onChange={handleInputChange}
            placeholder="Enter your sentence"
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};


export default InputSentenceComponent;


