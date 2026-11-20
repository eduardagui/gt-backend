const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Cria ou abre o ficheiro database.sqlite na pasta database
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao ligar ao SQLite:', err.message);
  } else {
    console.log('Ligado à base de dados SQLite com sucesso!');
  }
});

// Cria a tabela produtos se ainda não existir e insere dados iniciais se estiver vazia
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      preco REAL NOT NULL,
      categoria TEXT NOT NULL
    )
  `);

  db.get('SELECT COUNT(*) AS total FROM produtos', (err, row) => {
    if (!err && row && row.total === 0) {
      db.run(
        `INSERT INTO produtos (nome, preco, categoria) VALUES (?, ?, ?), (?, ?, ?)`,
        ['Tênis Esportivo', 199.90, 'Calçados', 'Camiseta Casual', 79.90, 'Roupas']
      );
    }
  });
});

module.exports = db;