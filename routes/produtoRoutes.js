const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

// Rotas CRUD de produtos
router.get('/', produtoController.listarProdutos);
router.get('/:id', produtoController.buscarProdutoPorId);
router.post('/', produtoController.criarProduto);
router.put('/:id', produtoController.atualizarProduto);
router.delete('/:id', produtoController.removerProduto);

module.exports = router;