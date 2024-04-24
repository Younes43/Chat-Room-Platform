const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const authenticateToken = require('../middleware/authenticateToken'); 

router.post('/', authenticateToken, messageController.postMessage);
router.get('/', authenticateToken, messageController.getAllMessages);
router.patch('/:id/upvote', authenticateToken, messageController.upvoteMessage);
router.patch('/:id/downvote', authenticateToken, messageController.downvoteMessage);


module.exports = router;
