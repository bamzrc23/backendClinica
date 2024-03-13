// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Ruta de registro de usuario
router.post('/register', async (req, res) => {
    try {
        const { username, password, role, name, lastName, age, menstrualData } = req.body;
        const user = new User({ username, password, role, name, lastName, age, menstrualData });
        await user.save();
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Registration failed' });
    }
});

// Ruta de autenticación de usuario
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(404).send({ error: 'User not found' });

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) return res.status(401).send({ error: 'Invalid password' });

        const token = jwt.sign({ userId: user._id }, 'secret_key');
        res.status(200).send({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Login failed' });
    }
});

module.exports = router;
