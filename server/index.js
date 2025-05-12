const express = require('express');
const bodyParser = require('body-parser');
const env = require('./config/config')
const cors = require('cors'); //Permite la interaccion de front a back
const app = express();
 
// Middlewares
 
// Habilita CORS para todas las rutas (en desarrollo)
app.use(cors({
  origin: env.FRONTEND_URL, // Reemplaza con el puerto de tu frontend React
  credentials: false // Si usas cookies o autenticación
}));

app.use(bodyParser.json()); // Permite leer el cuerpo de las peticiones en formato JSON
app.use(require('./routes/routes.js'));//usar las rutas

// Inicia el servidor
app.listen(env.PORT_SERVER, () => {
  console.log(`Servidor Node.js corriendo en http://localhost:${env.PORT_SERVER}`);
});

