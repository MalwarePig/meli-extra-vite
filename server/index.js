const express = require('express');
const bodyParser = require('body-parser');
const env = require('./config/config')
const cors = require('cors'); //Permite la interaccion de front a back
const app = express();
 const fs = require('fs');
 const OS = require("os"); 
 const https = require('https'); // Importa el módulo HTTPS

// Middlewares
 
// Habilita CORS para todas las rutas (en desarrollo)
app.use(cors({
  origin: env.FRONTEND_URL, // Reemplaza con el puerto de tu frontend React
  credentials: true // Si usas cookies o autenticación
}));

app.use(bodyParser.json()); // Permite leer el cuerpo de las peticiones en formato JSON
app.use(require('./routes/routes.js'));//usar las rutas

// Configuración de HTTPS (opcional, solo si necesitas HTTPS en desarrollo)
const options = {
  key: fs.readFileSync('./certs/localhost-key.pem'),
  cert: fs.readFileSync('./certs/localhost.pem'),
}

/* app.use(options) */



// Inicia el servidor
// Inicia el servidor HTTPS
const interfaces = OS.networkInterfaces();
https.createServer(options, app).listen(env.PORT_SERVER, () => { 
  console.log(`Servidor HTTPS corriendo en https://${env.localIP}:${env.PORT_SERVER}`); 
});

