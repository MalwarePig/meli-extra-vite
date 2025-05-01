const dotVar = require('../config/Token')
const jwt = require('jsonwebtoken');
const db = require('../config/firebase')
const Controller = {};

// Ruta para manejar el login 
Controller.login = async (req, res) => {
    const { idDriver, password } = req.body
    var userFound = false;
    var indice;
    try {
        const snapshot = await db.ref('users').once('value');
        const users = snapshot.val();
        if (!users) {
            return res.status(401).json({ error: 'Sin usuarios' });
        }

        // Buscar usuario que coincida
        for (const userId in users) {
            var user = users[userId];
            if (user.idDriver === idDriver && user.password === password) {
                userFound = true;
                indice = userId
            }
        }
        
        if (userFound) {
            const data = {
                'user': idDriver,//id Driver meli
                'idUser': indice,//id db
                'name': users[indice].name, //Nombre de usuario
                'level': users[indice].level //Nivel de usuario user/admin
            }

            const token = jwt.sign(
                {
                    data,
                    role: 'user'
                }, // Payload ajustado
                dotVar.SECRET_KEY,
                {
                    expiresIn: '1h'
                }
            );
            res.json({ token });
        } else {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

    } catch (error) {
        console.error("Error al verificar usuario:", error);
        throw error;
    }
}

//ruta de registro de usuarios
Controller.register = (req, res) => {
    const { idDriver, name, phone, plates, model, typeVehiculoR, otherType, password } = req.body;

    const data = {
        'idDriver': idDriver,
        'name': name,
        'phone': phone,
        'plates': plates,
        'model': model,
        'typeVehiculoR': typeVehiculoR,
        'otherType': otherType,
        'password': password,
        'status': true, //Estado suspension
        'qr': false, //Estado al registrar eta a tiempo
        'ETA': '', //horario de la ETA
        'level': 'user'
    }

    db.ref('users').push(data)
    console.log(req.body)
    res.json(true)
}






module.exports = Controller;