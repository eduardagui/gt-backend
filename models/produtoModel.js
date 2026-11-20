const db = require('../database/db');

function listarTodos() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM produtos', [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

function buscarPorId(id) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM produtos WHERE id = ?', [id], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

function criar({ nome, preco, categoria }) {
  return new Promise((resolve, reject) => {
    const precoConvertido = Number(preco);
    db.run(
      'INSERT INTO produtos (nome, preco, categoria) VALUES (?, ?, ?)',
      [nome, precoConvertido, categoria],
      function (err) {
        if (err) return reject(err);
        resolve({
          id: this.lastID,
          nome,
          preco: precoConvertido,
          categoria
        });
      }
    );
  });
}

function atualizar(id, { nome, preco, categoria }) {
  return new Promise(async (resolve, reject) => {
    try {
      const atual = await buscarPorId(id);
      if (!atual) return resolve(null);

      const novoNome = nome ?? atual.nome;
      const novoPreco = preco !== undefined ? Number(preco) : atual.preco;
      const novaCategoria = categoria ?? atual.categoria;

      db.run(
        'UPDATE produtos SET nome = ?, preco = ?, categoria = ? WHERE id = ?',
        [novoNome, novoPreco, novaCategoria, id],
        function (err) {
          if (err) return reject(err);
          resolve({
            id,
            nome: novoNome,
            preco: novoPreco,
            categoria: novaCategoria
          });
        }
      );
    } catch (err) {
      reject(err);
    }
  });
}

function remover(id) {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM produtos WHERE id = ?', [id], function (err) {
      if (err) return reject(err);
      resolve(this.changes > 0);
    });
  });
}

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  remover
};