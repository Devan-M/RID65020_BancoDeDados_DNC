// src/server.js
const express = require("express");
require("dotenv").config();

const { sequelize } = require("./associations");

const app = express();
app.use(express.json());

// Inicializa conexão e sincroniza tabelas
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexão com o banco estabelecida.");

    await sequelize.sync({ alter: true });
    console.log("✅ Tabelas criadas/atualizadas com sucesso.");
  } catch (err) {
    console.error("❌ Erro ao inicializar o banco:", err.message);
    process.exit(1);
  }
})();

// Rota de saúde (teste rápido)
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Importa e usa as rotas
const produtosRouter = require("./routes/produtos");
const clientesRouter = require("./routes/clientes");
const pedidosRouter = require("./routes/pedidos");
const vendasRouter = require("./routes/vendas");

app.use("/produtos", produtosRouter);
app.use("/clientes", clientesRouter);
app.use("/pedidos", pedidosRouter);
app.use("/vendas", vendasRouter);

// Porta da aplicação
const port = process.env.APP_PORT || 3000;
app.listen(port, () => console.log(`🚀 Servidor rodando na porta ${port}`));