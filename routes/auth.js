const express = require('express');
const { auth } = require('../firebaseconfig'); // Importa o auth configurado no firebaseconfig.js

const router = express.Router();

// Rota de cadastro
router.post('/register', async (req, res) => {
    const { email, password, name } = req.body;

    try {
        const userRecord = await auth.createUser({
            email,
            password,
            displayName: name,
        });
        res.status(201).json({ message: 'Usuário registrado com sucesso.', userId: userRecord.uid });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(400).json({ error: error.message });
    }
});

// Rota de login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // No Firebase Admin SDK, você não pode autenticar diretamente o usuário como no Client SDK.
        // A autenticação deve ser feita no frontend usando Firebase Client SDK para obter o token JWT.
        res.status(200).json({ message: 'Use o Firebase Client SDK para autenticar.' });
    } catch (error) {
        console.error('Erro ao logar usuário:', error);
        res.status(401).json({ error: error.message });
    }
});

module.exports = router;
