# Projeto DNC - Banco de Dados

Este projeto foi desenvolvido como parte do desafio da DNC para modelagem de dados e criação de uma API REST utilizando Node.js, Express e Sequelize com banco de dados MySQL.
O sistema permite o cadastro de produtos, clientes, pedidos e o registro de vendas, simulando o fluxo de uma loja online.

## 🛠️ Requisitos do Sistema
Antes de rodar o projeto, certifique-se de que os seguintes requisitos estão atendidos:

 ✅ Node.js instalado (versão 18 ou superior recomendada)
 
 ✅ MySQL instalado e rodando localmente
 
 ✅ Um banco de dados criado com o nome definido no .env (exemplo: dnc_loja)


## 🚀 Tecnologias utilizadas
 Node.js
 Express
 Sequelize (ORM)
- Banco de dados relacional (MySQL)
- Dotenv para variáveis de ambiente

## 📦 Entidades e Atributos do Sistema
O sistema de gerenciamento de vendas online foi projetado para controlar os seguintes objetos e informações:
- Produtos
    - id_produto (chave primária)
    - nome
    - descricao
    - preco
    - categoria
    - quantidade_estoque

- Clientes
    - id_cliente (chave primária)
    - nome
    - email
    - telefone
    - endereco

- Pedidos
    - id_pedido (chave primária)
    - id_cliente (chave estrangeira → Clientes)
    - data_pedido
    - status (pendente, concluído, cancelado)
    - itens (lista de produtos com quantidade e preço unitário)

- Vendas
    - id_venda (chave primária)
    - id_pedido (chave estrangeira → Pedidos)
    - valor_total
    - data_venda

- Estoque
    - id_produto (chave estrangeira → Produtos)
    - quantidade_estoque
    - movimentacoes (entradas e saídas de produtos)

## 📊 Diagrama Entidade-Relacionamento (simplificado)
```
Clientes (id_cliente, nome, email, telefone, endereco)
        │
        │ 1:N
        │
Pedidos (id_pedido, id_cliente, data_pedido, status)
        │
        │ 1:1
        │
Vendas (id_venda, id_pedido, valor_total, data_venda)

Produtos (id_produto, nome, descricao, preco, categoria, quantidade_estoque)
        │
        │ N:M
        │
PedidoProduto (id_pedido, id_produto, quantidade, preco_unitario)
```

## 🔎 Explicação das relações
- Clientes → Pedidos: um cliente pode ter vários pedidos (relação 1:N).
- Pedidos → Vendas: cada pedido gera uma única venda (relação 1:1).
- Pedidos ↔ Produtos: relação N:M, representada pela tabela intermediária PedidoProduto, que guarda quantidade e preço unitário.
- Produtos → Estoque: o estoque é controlado pelo atributo quantidade_estoque dentro da entidade Produto.

👉 Esse diagrama em texto é simples, mas já mostra claramente como as entidades se relacionam.
Quer que eu prepare também uma versão visual em Mermaid (Markdown) para que o GitHub renderize um diagrama gráfico direto no README?


## ⚙️ Instalação e execução

1. Clone o repositório:
```
git clone https://github.com/seuusuario/projeto-dnc-banco-de-dados.git

cd projeto-dnc-banco-de-dados
```

2. Instale as dependências:
```
npm install
```
3. Configure o arquivo .env com suas credenciais do banco:
```
DB_HOST=localhost
DB_USER=root
DB_PASS=sua_senha
DB_NAME=projeto_dnc
APP_PORT=3000
```
4. Inicie o servidor:
```
node src/server.js
```
5. O servidor estará disponível em:
```
http://localhost:3000
```
## 🧪 Roteiro de testes (Insomnia/Postman)

Health check
```
GET /health → { "status": "ok" }
```
Produtos
```
POST /produtos → cria produto
```
```
GET /produtos → lista produtos
```
```
GET /produtos/:id → busca produto por ID
```
```
PUT /produtos/:id → atualiza produto
```
```
DELETE /produtos/:id → remove produto
```
Clientes
```
POST /clientes → cria cliente
```
```
GET /clientes → lista clientes
```
```
GET /clientes/:id → busca cliente por ID
```
```
PUT /clientes/:id → atualiza cliente
```
```
DELETE /clientes/:id → remove cliente
```
Pedidos
```
POST /pedidos → cria pedido com itens
```
```
GET /pedidos/:id → detalha pedido
```
Vendas
```
POST /vendas → registra venda a partir de um pedido
```
```
GET /vendas → lista vendas
```
## 📂 Estrutura de pastas
```
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
```
## ✅ Fluxo básico

- Cadastrar produtos

- Cadastrar clientes

- Criar pedidos com itens

- Registrar vendas

## 📌 Observações

As tabelas são sincronizadas automaticamente com 
```sequelize.sync({ alter: true }).```

Recomenda-se usar migrations em produção.

O campo preco_unitario é gravado no momento do pedido para preservar histórico.

## 👨‍💻 Autor

Projeto desenvolvido por **Devan M.** como parte do curso DNC.
