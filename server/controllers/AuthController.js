const express = require('express'); //guardar express en una variable de servidor
const dotVar = require('../config/Token')
const jwt = require('jsonwebtoken');
const Controller = {};

// Ruta para manejar el login
Controller.login = (req, res) => {
    const { user, password } = req.body;
    console.log(req.body)

    //console.log(user, password)
    if (user !== 'sergio' || password !== '123') {
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const data = {
        'user' : user, 
        'password' : password
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
};




module.exports = Controller;