const produtoModel = require('../models/produtoModel');

async function listarProdutos(req, res) {
  try {
    const produtos = await produtoModel.listarTodos();
    res.status(200).json(produtos);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar produtos' });
  }
}

async function buscarProdutoPorId(req, res) {
  try {
    const id = Number(req.params.id);
    const produto = await produtoModel.buscarPorId(id);

    if (!produto) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }

    res.status(200).json(produto);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar produto' });
  }
}

async function criarProduto(req, res) {
  try {
    const { nome, preco, categoria } = req.body;

    if (!nome || preco === undefined || !categoria) {
      return res.status(400).json({ erro: 'Informe nome, preco e categoria' });
    }

    const novoProduto = await produtoModel.criar({ nome, preco, categoria });
    res.status(201).json(novoProduto);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar produto' });
  }
}

async function atualizarProduto(req, res) {
  try {
    const id = Number(req.params.id);
    const produtoAtualizado = await produtoModel.atualizar(id, req.body);

    if (!produtoAtualizado) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }

    res.status(200).json(produtoAtualizado);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar produto' });
  }
}

async function removerProduto(req, res) {
  try {
    const id = Number(req.params.id);
    const removido = await produtoModel.remover(id);

    if (!removido) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }

    res.status(200).json({ mensagem: 'Produto removido com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao remover produto' });
  }
}

module.exports = {
  listarProdutos,
  buscarProdutoPorId,
  criarProduto,
  atualizarProduto,
  removerProduto
};