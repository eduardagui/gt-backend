const express = require('express');
const swaggerUi = require('swagger-ui-express');
const app = express();
const PORT = 3000;

const produtoRoutes = require('./routes/produtoRoutes');

app.use(express.json());

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'API de Produtos - Digital Store',
    version: '1.0.0',
    description: 'API RESTful com Node.js, Express, arquitetura MVC e SQLite'
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor local'
    }
  ],
  paths: {
    '/produtos': {
      get: {
        summary: 'Listar todos os produtos',
        responses: {
          200: {
            description: 'Lista de produtos retornada com sucesso'
          }
        }
      },
      post: {
        summary: 'Criar um novo produto',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['nome', 'preco', 'categoria'],
                properties: {
                  nome: { type: 'string', example: 'Teclado Mecânico' },
                  preco: { type: 'number', example: 249.90 },
                  categoria: { type: 'string', example: 'Eletronicos' }
                }
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Produto criado com sucesso'
          },
          400: {
            description: 'Dados inválidos ou incompletos'
          }
        }
      }
    },
    '/produtos/{id}': {
      get: {
        summary: 'Buscar produto por ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' }
          }
        ],
        responses: {
          200: {
            description: 'Produto encontrado'
          },
          404: {
            description: 'Produto não encontrado'
          }
        }
      },
      put: {
        summary: 'Atualizar produto por ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  nome: { type: 'string', example: 'Teclado Mecânico RGB' },
                  preco: { type: 'number', example: 279.90 },
                  categoria: { type: 'string', example: 'Eletronicos' }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Produto atualizado com sucesso'
          },
          404: {
            description: 'Produto não encontrado'
          }
        }
      },
      delete: {
        summary: 'Remover produto por ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' }
          }
        ],
        responses: {
          200: {
            description: 'Produto removido com sucesso'
          },
          404: {
            description: 'Produto não encontrado'
          }
        }
      }
    }
  }
};

// Rota inicial
app.get('/', (req, res) => {
  res.json({ mensagem: 'API de Produtos está funcionando!' });
});

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas de produtos
app.use('/produtos', produtoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Swagger disponível em http://localhost:${PORT}/api-docs`);
});