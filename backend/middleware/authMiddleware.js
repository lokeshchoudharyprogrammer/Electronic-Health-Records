const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  const token = authHeader && authHeader.split(' ')[1];
console.log(authHeader)
  if (!authHeader) return res.status(401).json({ message: 'Unauthorized' });
  jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });
    req.user = user;
    next();
  });
};
