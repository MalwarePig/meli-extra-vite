const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 4000;

// Middlewares
// Habilita CORS para todas las rutas (en desarrollo)
app.use(cors({
  origin: 'http://localhost:3000', // Reemplaza con el puerto de tu frontend React
  credentials: true // Si usas cookies o autenticación
}));

app.use(bodyParser.json()); // Permite leer el cuerpo de las peticiones en formato JSON

app.use(require('./routes/routes.js'));//usar las rutas


// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor Node.js corriendo en http://localhost:${PORT}`);
});