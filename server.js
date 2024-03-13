const express = require('express');
const cors = require('cors');
const db = require('./db');
const authController = require('./controllers/authController');
const authenticateToken = require('./middlewares/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar CORS
app.use(cors());

app.use(express.json());

app.use(authController);

app.get('/user', authenticateToken, (req, res) => {
  res.json(req.user);
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
