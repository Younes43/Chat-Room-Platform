const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract the token from 'Bearer TOKEN'
  
    if (token == null) return res.sendStatus(401); // No token, unauthorized
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403); // Invalid token
      req.user = user;
      next();
    });
  }

module.exports = authenticateToken;