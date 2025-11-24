require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  PYTHON_API_URL: process.env.PYTHON_API_URL || 'http://localhost:8000',
  NODE_ENV: process.env.NODE_ENV || 'development'
};