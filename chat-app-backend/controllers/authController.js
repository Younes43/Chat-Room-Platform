const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: "Username already exists. Please select another username." });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            username,
            password: hashedPassword
        });
        await newUser.save();

        // Create token just like in the login
        const token = jwt.sign({ username: newUser.username }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });

        // Return the new user's info and token
        res.status(201).json({ message: 'User created successfully', token: token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });  // Include username in the token
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

