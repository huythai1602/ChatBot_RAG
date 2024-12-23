const mongoose = require('mongoose');
require('dotenv').config();

const dbURI = process.env.MONGODB_URI;

const connectDB = () => {
  return mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
};

module.exports = connectDB;