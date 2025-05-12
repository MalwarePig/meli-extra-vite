const db = require('../config/firebase')
const Controller = {};

//buscar usuario por idDriver
Controller.loadUsersStatus = async (req, res) => {
    /* Consulta la tabla users */
    const snapshot = await db.ref('users').orderByChild('level').equalTo('user').once('value'); //Filtra por nivel
    const users = snapshot.val();

    console.log(users)
    if (!users) {
        return res.status(401).json({ error: 'Sin usuarios' });
    }else{
        res.json(users);
    } 
}

//ruta de registro QR
Controller.SetQR = async (req, res) => {
    const {Clave} = req.body
    console.log(req.body)

    try {
        // Obtener todos los usuarios
        const snapshot = await db.ref('users').once('value');
        const users = snapshot.val();

        if (!users) {
            return res.status(404).json({ error: 'No se encontraron usuarios' });
        }

        // Crear un objeto de actualizaciones
        const updates = {};
        Object.keys(users).forEach(userId => {
            updates[`users/${userId}/qr`] = Clave; // Actualiza el campo `qr` para cada usuario
        });

        // Aplicar las actualizaciones en Firebase
        await db.ref().update(updates);

        res.json({ success: true, message: 'Campo QR actualizado para todos los usuarios' });
    } catch (error) {
        console.error("Error al actualizar:", error);
        res.status(500).json({ error: error.message });
    }
}


module.exports = Controller;