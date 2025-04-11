const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 4000;
const SECRET_KEY = 'clave_secreta_para_jwt'; // ¡Usa variables de entorno en producción!

// Middlewares
// Habilita CORS para todas las rutas (en desarrollo)
app.use(cors({
  origin: 'http://localhost:3000', // Reemplaza con el puerto de tu frontend React
  credentials: true // Si usas cookies o autenticación
}));
app.use(bodyParser.json()); // Permite leer el cuerpo de las peticiones en formato JSON

// Ruta para manejar el login
app.post('/login', (req, res) => {
    const { user, password } = req.body; 
    console.log(req.body)
  
    //console.log(user, password)
    if (user !== 'sergio' || password !== '123') {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
  
    const token = jwt.sign(
      { user, role: 'user' }, // Payload ajustado
      SECRET_KEY,
      { expiresIn: '1h' }
    );
  
    res.json({ token });
  });

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor Node.js corriendo en http://localhost:${PORT}`);
});