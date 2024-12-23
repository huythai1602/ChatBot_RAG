const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const axios = require('axios');

// Lưu trữ tin nhắn và trả về phản hồi từ mô hình RAG
router.post('/chat', async (req, res) => {
  const { sender, text } = req.body;
  try {
    // Gọi API Flask để sinh câu trả lời từ mô hình RAG
    const response = await axios.post('http://localhost:5000/api/rag', { query: text });
    const reply = response.data.answer;
    
    // Lưu trữ câu hỏi và câu trả lời
    const message = new Message({ sender, text, reply });
    await message.save();
    console.log('Message saved:', message);
    
    res.status(201).json({ reply });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error saving message or generating answer' });
  }
});

// Lấy lịch sử tin nhắn
router.get('/history', async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching messages' });
  }
});

module.exports = router;