const express = require('express'); //guardar express en una variable de servidor
const router = express.Router(); //usar modulo de router de ex´press
const AuthController = require('../controllers/AuthController');

//Iniciar sesion
router.post('/login', AuthController.login);

//cajas de herramientas
//router.get('/Search/:parametro', AuthController.Searchls);



module.exports = router;