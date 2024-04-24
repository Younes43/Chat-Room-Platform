const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');

const authenticateToken = require('./middleware/authenticateToken');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const Mongo_uri = process.env.MONGO_URI || 'mongodb://localhost:27017/chatApp';

// Middleware setup
app.use(cors());
app.use(bodyParser.json());


// Routes
app.use('/api/auth', authRoutes);
// Applying authentication middleware to message routes
app.use('/api/messages', authenticateToken, messageRoutes);

// Connect to MongoDB
mongoose.connect(Mongo_uri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
