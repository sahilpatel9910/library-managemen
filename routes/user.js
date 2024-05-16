const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const secretKey = 'your_secret_key';

const authorize = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }
  return [
    (req, res, next) => {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, secretKey);
      req.user = decoded;
      next();
    },
    (req, res, next) => {
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      next();
    }
  ];
};

router.get('/admin', authorize(['admin']), (req, res) => {
  res.send('Admin access');
});

router.get('/user', authorize(['user', 'admin']), (req, res) => {
  res.send('User access');
});

module.exports = router;
