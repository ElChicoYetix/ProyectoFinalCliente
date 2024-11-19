// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const multer = require('multer');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"]
  }
});
const cors = require('cors');
app.use(cors());
// Configuración de multer para almacenamiento de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/'); // Carpeta de destino para los archivos
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Nombre del archivo
  }
});

const upload = multer({ storage: storage });

app.use(express.static('public'));

// Ruta para cargar archivos
app.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    console.log(`Archivo añadido: ${req.file.filename}, guardado en /uploads/`);
    res.status(200).json({ filename: req.file.filename, path: `/uploads/${req.file.filename}` });
  } else {
    res.status(400).json({ error: 'No file uploaded' });
  }
});

io.on('connection', (socket) => {
  console.log('Nuevo usuario conectado');

  socket.on('newUser', (data) => {
    socket.username = data.user;
    socket.broadcast.emit('message', `${data.user} se ha unido a la conversación`);
  });

  socket.on('newMessage', (msg) => {
    const date = new Date().toLocaleString();
    io.emit('newMessage', { user: socket.username, message: msg.message, date });
  });

  socket.on('fileMessage', (fileData) => {
    io.emit('fileMessage', { user: socket.username, filePath: fileData.path, fileName: fileData.filename });
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('message', `${socket.username} ha dejado la conversación`);
  });
});

const PORT = process.env.PORT || 5002;
server.listen(PORT, () => {
  console.log(`Corriendo en el puerto ${PORT}!`);
});