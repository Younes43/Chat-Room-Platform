const Message = require('../models/Message');
const User = require('../models/User'); 

exports.postMessage = async (req, res) => {
  const { text, username } = req.body;
  if (!text || !username) {
    return res.status(400).json({ message: "Missing text or username" });
  }

  try {
    const newMessage = await Message.create({ text, user: username });
    console.log(newMessage); 
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error posting message:", error);
    res.status(500).json({ message: "Error posting message", error: error.message });
  }
};


exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving messages", error });
  }
};


exports.upvoteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await Message.findByIdAndUpdate(
      id,
      { $inc: { upvotes: 1 } },
      { new: true }
    ).populate('user', 'username'); 

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: "Error upvoting message", error });
  }
};

exports.downvoteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await Message.findByIdAndUpdate(
      id,
      { $inc: { downvotes: 1 } },
      { new: true }
    ).populate('user', 'username');

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: "Error downvoting message", error });
  }
};



