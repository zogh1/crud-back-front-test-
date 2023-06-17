
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./Routes/ProductRoute');
const app = express();
const port = 3001; 
const cors = require('cors');
require('dotenv').config();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 


app.use('/api/products', productRoutes);


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB database');
});

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});