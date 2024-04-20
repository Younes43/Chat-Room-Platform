const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.post('/', messageController.postMessage);
router.get('/', messageController.getAllMessages);
router.patch('/:id/upvote', messageController.upvoteMessage);
router.patch('/:id/downvote', messageController.downvoteMessage);

module.exports = router;
