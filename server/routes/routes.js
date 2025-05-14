const express = require('express'); //guardar express en una variable de servidor
const router = express.Router(); //usar modulo de router de ex´press
const AuthController = require('../controllers/AuthController');
const AdminController = require('../controllers/AdminController');
const DriverController = require('../controllers/DriverController');

/**** AUTH ****/
//Iniciar sesion
router.post('/login', AuthController.login);
//Regitrar usuarios
router.post('/register', AuthController.register);

/**** Drivers ****/
//Buscar user por idDriver
router.get('/loadUserById/:idDriver', DriverController.getUserById);
//Regitrar ETA
router.post('/setETA', DriverController.setETA);


/**** ADMIN *****/
//Obtner users
router.get('/loadUsersStatus/', AdminController.loadUsersStatus);
//Regitrar QR
router.post('/SetQR', AdminController.SetQR);
//Cargar qr actual
router.get('/GetQR/', AdminController.GetQR);

module.exports = router;