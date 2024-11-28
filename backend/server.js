// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('./config/passport');

require('dotenv').config();

const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch((error) => console.error('Error conectando a MongoDB:', error));

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);

app.use(passport.initialize());
app.use(passport.session());

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Manejar errores de conexión a MongoDB
mongoose.connection.on('error', (error) => {
    console.error('Error en la conexión a MongoDB:', error);
  });
  
// Manejar reconexiones
mongoose.connection.on('connected', () => {
    console.log('Reconectado a MongoDB');
  });
  
mongoose.connection.on('disconnected', () => {
    console.warn('Desconectado de MongoDB. Intentando reconectar...');
  });