const express = require('express');
const multer = require('multer');
const { db, bucket } = require('../firebaseconfig');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Rota para criar um produto
router.post('/create', upload.single('imagem'), async (req, res) => {
    try {
        console.log('Dados recebidos no corpo da requisição:', req.body);
        console.log('Arquivo recebido:', req.file);

        const { nome, preco, descricao } = req.body;

        // Verifica se a imagem foi enviada
        if (!req.file) {
            console.error('Erro: Imagem não foi enviada.');
            return res.status(400).json({ error: 'Imagem é obrigatória' });
        }

        // Cria o arquivo no bucket do Firebase Storage
        const blob = bucket.file(`produtos/${req.file.originalname}`);
        const blobStream = blob.createWriteStream({
            metadata: { contentType: req.file.mimetype },
        });

        blobStream.on('error', (err) => {
            console.error('Erro no blobStream:', err);
            res.status(500).json({ error: err.message });
        });

        blobStream.on('finish', async () => {
            const imageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            console.log('URL da imagem:', imageUrl);

            // Salva os dados no Firestore
            const docRef = await db.collection('produtos').add({
                nome,
                preco: parseFloat(preco),
                descricao,
                imagemUrl: imageUrl,
                criadoEm: new Date(),
            });

            console.log('Produto criado com sucesso:', docRef.id);
            res.status(201).json({ mensagem: 'Produto criado com sucesso', id: docRef.id });
        });

        blobStream.end(req.file.buffer);
    } catch (error) {
        console.error('Erro inesperado no backend:', error);
        res.status(500).json({ error: 'Erro ao cadastrar produto', detalhes: error.message });
    }
});

module.exports = router;
