// server.js 

//dependencies 
const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express(); 
const PORT = process.env.PORT || 5000;

const gameRouter = require('./routes/gameRoutes')

app.use(cors());
app.use(express.json());

// get the routes


dotenv.config(); // loading the environment vars 

// db connection setup
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// mount routes here ---> 

app.use('/api', gameRouter);
// starting the actual react server on port 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // print this if server runs
});

