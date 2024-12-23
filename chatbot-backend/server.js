const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const axios = require('axios');

const app = express();
const port = 3001;

// Kết nối tới MongoDB
connectDB()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });

app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');

// Sử dụng routes
app.use('/api', authRoutes);
app.use('/api', chatRoutes);

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  try {
    const response = await axios.post('http://localhost:5000/api/rag', { query: message });
    const reply = response.data.answer;
    res.status(201).json({ reply });
  } catch (error) {
    res.status(500).json({ error: 'Error generating answer' });
  }
});

app.get('/', (req, res) => {
  res.send('Hello, this is the ChatBot backend!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});