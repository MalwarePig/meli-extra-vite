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
    const { user, idUser, ETA, qr } = req.body
    var OnTime = ''

    try {
        // Obtener los datos del usuario desde Firebase
        const snapshot = await db.ref('users').child(idUser).once('value');
        const userData = snapshot.val();

        // Comprobar si la contraseña y ETA son iguales
        if (userData.qr !== qr) {
            return res.status(400).json({ error: 'QR no coinciden' });
        }

        // Obtener la hora actual
        const currentTime = new Date();
        const currentHours = currentTime.getHours(); // Horas actuales
        const currentMinutes = currentTime.getMinutes(); // Minutos actuales

        // Extraer las horas y minutos de ETA
        const [etaHours, etaMinutes] = ETA.split(':').map(Number); // Divide y convierte a números

        console.log(`Hora actual: ${currentHours}:${currentMinutes}`);
        console.log(`Hora ETA: ${etaHours}:${etaMinutes}`);

        // Comparar las horas y minutos
        if (
            currentHours > etaHours ||
            (currentHours === etaHours && currentMinutes >= etaMinutes)
        ) {
            OnTime = 'Late';
        } else {
            OnTime = 'Early';
        }

        // Crear objeto de actualización dinámico
        const updateData = {
            ['ETA']: ETA,
            ['OnTime']: OnTime,
            ['register']: `${currentHours}:${currentMinutes}`, // Cambiar el estado del QR a false          

        };

        // Actualizar directamente el campo
        await db.ref('users').child(idUser).update(updateData);
        res.json({ success: true, message: 'ETA registrado correctamente', OnTime: OnTime });

        // Actualizar directamente el campo
        /* db.ref('users').child(idUser).update(updateData)
            .then(() => res.json({ success: true }))
            .catch(error => res.status(500).json({ error: error.message })); */

    } catch (error) {
        console.error("Error al actualizar:", error);
        return false;
    }
}

module.exports = Controller;