const db = require('../config/firebase')
const Controller = {};


//buscar usuario por idDriver
Controller.getUserById = async (req, res) => {
    const { idDriver } = req.params;
    var userFound = false
    var user;
    console.log(idDriver)

    /* Consulta la tabla users */
    const snapshot = await db.ref('users').once('value');
    const users = snapshot.val();
    if (!users) {
        return res.status(401).json({ error: 'Sin usuarios' });
    }

    // Buscar usuario que coincida
    for (const userId in users) {
        user = users[userId];
        if (user.idDriver === idDriver) {
            userFound = user
        }
    }

    if (userFound) {
        res.json(userFound);
    } else {
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }
}

//ruta de registro ETA
Controller.setETA = async (req, res) => {
    const { user, idUser, ETA} = req.body
    console.log(req.body)

    try { 
        // Crear objeto de actualización dinámico
        const updateData = {
            ['ETA']: ETA, 
        };

        // Actualizar directamente el campo
        db.ref('users').child(idUser).update(updateData)
            .then(() => res.json({ success: true }))
            .catch(error => res.status(500).json({ error: error.message }));

    } catch (error) {
        console.error("Error al actualizar:", error);
        return false;
    }
}

module.exports = Controller;