# API de Produtos - Projeto Final de Back-end (Geração Tech)

API RESTful desenvolvida em Node.js e Express com arquitetura MVC e persistência em banco de dados local SQLite, criada como projeto final de back-end do curso.

##  Tecnologias Utilizadas
- **Node.js**
- **Express.js**
- **SQLite3** (banco de dados local `database/database.sqlite`)
- **Swagger UI Express** (documentação interativa da API)

##  Estrutura do Projeto (MVC)
- `database/db.js`: conexão com o SQLite e criação automática da tabela `produtos`.
- `models/produtoModel.js`: regras de acesso e manipulação dos dados no banco (`SELECT`, `INSERT`, `UPDATE`, `DELETE`).
- `controllers/produtoController.js`: controle das requisições HTTP, validações, códigos de status e tratamento de erros.
- `routes/produtoRoutes.js`: definição das rotas da API (`/produtos` e `/produtos/:id`).
- `index.js`: inicialização do servidor Express e configuração do Swagger.

##  Endpoints Principais
- `GET /produtos` — Lista todos os produtos cadastrados (`200`).
- `GET /produtos/:id` — Busca um produto específico pelo ID (`200` ou `404`).
- `POST /produtos` — Cria um novo produto (`201` ou `400`).
- `PUT /produtos/:id` — Atualiza um produto existente (`200` ou `404`).
- `DELETE /produtos/:id` — Remove um produto pelo ID (`200` ou `404`).

##  Documentação Swagger
Com o servidor rodando, acesse no navegador:
- `http://localhost:3000/api-docs`

##  Como Executar o Projeto Localmente

1. Abra a pasta `gt_backend` no terminal ou VS Code.
2. Instale as dependências:
   ```bash
   npm install

   integrante: Maria Eduarda Alves Guimarães