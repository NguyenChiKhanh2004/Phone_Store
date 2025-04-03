const express = require('express');
const router = express.Router();
const chatController = require('../controllers/ChatController');

router.post('/sendMessage', chatController.sendMessage);

module.exports = router;
