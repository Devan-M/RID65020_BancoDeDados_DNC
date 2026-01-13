Projeto DNC - Banco de Dados

Este projeto é uma API REST desenvolvida em Node.js + Express + Sequelize para gerenciar um fluxo completo de Produtos → Clientes → Pedidos → Vendas.

🚀 Tecnologias utilizadas

Node.js

Express

Sequelize (ORM)

Banco de dados relacional (MySQL/PostgreSQL)

Dotenv para variáveis de ambiente

⚙️ Instalação e execução

Clone o repositório:

git clone https://github.com/seuusuario/projeto-dnc-banco-de-dados.git
cd projeto-dnc-banco-de-dados

Instale as dependências:

npm install

Configure o arquivo .env com suas credenciais do banco:

DB_HOST=localhost
DB_USER=root
DB_PASS=sua_senha
DB_NAME=projeto_dnc
APP_PORT=3000

Inicie o servidor:

node src/server.js

O servidor estará disponível em:

http://localhost:3000

🧪 Roteiro de testes (Insomnia/Postman)

Health check

GET /health → { "status": "ok" }

Produtos

POST /produtos → cria produto

GET /produtos → lista produtos

GET /produtos/:id → busca produto por ID

PUT /produtos/:id → atualiza produto

DELETE /produtos/:id → remove produto

Clientes

POST /clientes → cria cliente

GET /clientes → lista clientes

GET /clientes/:id → busca cliente por ID

PUT /clientes/:id → atualiza cliente

DELETE /clientes/:id → remove cliente

Pedidos

POST /pedidos → cria pedido com itens

GET /pedidos/:id → detalha pedido

Vendas

POST /vendas → registra venda a partir de um pedido

GET /vendas → lista vendas

📂 Estrutura de pastas

projeto-dnc-banco-de-dados/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── Cliente.js
│   │   ├── Produto.js
│   │   ├── Pedido.js
│   │   ├── PedidoProduto.js
│   │   └── Venda.js
│   ├── routes/
│   │   ├── clientes.js
│   │   ├── produtos.js
│   │   ├── pedidos.js
│   │   └── vendas.js
│   ├── associations.js
│   └── server.js
├── .env
├── .gitignore
└── package.json

✅ Fluxo básico

Cadastrar produtos

Cadastrar clientes

Criar pedidos com itens

Registrar vendas

📌 Observações

As tabelas são sincronizadas automaticamente com sequelize.sync({ alter: true }).

Recomenda-se usar migrations em produção.

O campo preco_unitario é gravado no momento do pedido para preservar histórico.

👨‍💻 Autor

Projeto desenvolvido por Devan como parte do curso DNC.