const admin = require('firebase-admin');
const serviceAccount = require('./services.json'); // Substitua pelo caminho correto para suas credenciais

// Inicializar Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'berrmapper.firebasestorage.app', // Certifique-se de usar o nome correto do bucket
});

// Configuração do Firestore e Storage
const db = admin.firestore();
const bucket = admin.storage().bucket();

module.exports = { db, bucket };
