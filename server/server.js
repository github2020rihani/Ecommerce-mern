const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
 app.use(express.json());
 
require('dotenv').config({
  path: './config/config.env',
});
// MongoDB
const connectDB = require('./config/db.js');
connectDB();

app.use(morgan('dev'));
app.use(cors());

// routes
app.use('/api/user/', require('./routes/auth.router'));


app.get('/', (req, res) => {
  res.send('test route => home page');
});

// Page Not founded
app.use((req, res) => {
  res.status(404).json({
    msg: 'Page not founded',
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});