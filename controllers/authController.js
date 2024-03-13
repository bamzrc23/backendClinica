const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, password, role, profile } = req.body;
    const user = new User({ username, password, role, profile });
    await user.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    const token = jwt.sign({ username: user.username, role: user.role }, 'secretkey');
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
