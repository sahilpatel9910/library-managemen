const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const router = express.Router();

const secretKey = 'your_secret_key';

router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ username, password: hashedPassword, role });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'User registration failed' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id, role: user.role }, secretKey, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
