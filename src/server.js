const express = require("express");
require("dotenv").config();

const {
  sequelize,
  Cliente,
  Produto,
  Pedido,
  Venda,
  PedidoProduto
} = require("./associations");

const app = express();
app.use(express.json());

// Sincroniza models com o banco (cria/atualiza tabelas)
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco estabelecida.");

    await sequelize.sync({ alter: true });
    console.log("Tabelas criadas/atualizadas com sucesso.");
  } catch (err) {
    console.error("Erro ao inicializar o banco:", err.message);
    process.exit(1);
  }
})();

// Rotas mínimas de teste
app.get("/health", (req, res) => res.json({ status: "ok" }));

app.post("/produtos", async (req, res) => {
  try {
    const produto = await Produto.create(req.body);
    res.status(201).json(produto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/produtos", async (req, res) => {
  const produtos = await Produto.findAll();
  res.json(produtos);
});

const port = process.env.APP_PORT || 3000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));