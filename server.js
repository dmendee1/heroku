const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const orders = require('./routes/api/orders');
const orderDetail = require('./routes/api/orderDetail');
const workers = require('./routes/api/workers');

const app = express();
var session = require('express-session');
// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(session({secret:"ui2hf893hf232ofn3023fp", resave: false, saveUninitialized: true}));

// Use Routes
app.use('/api/orders', orders);

app.use('/api/orderDetail', orderDetail);

app.use('/api/workers', workers);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });		
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
