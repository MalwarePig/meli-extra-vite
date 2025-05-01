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





module.exports = Controller;