const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middlewares
app.use(cors({ origin: 'http://localhost:3000' })); // Permitir requisições do frontend local
app.use(bodyParser.json());

// Rotas
const productRoutes = require('./routes/product'); // Rota de produtos
app.use('/api/produtos', productRoutes);

// Middleware de erro
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ error: err.message || 'Erro no servidor.' });
});

// Inicia o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
