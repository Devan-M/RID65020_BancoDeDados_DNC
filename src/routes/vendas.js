const express = require("express");
const router = express.Router();
const sequelize = require("../config/db");
const Pedido = require("../models/Pedido");
const Venda = require("../models/Venda");
const Produto = require("../models/Produto");

// Registrar venda a partir de um pedido
// Body esperado: { "id_pedido": 1 }
router.post("/", async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { id_pedido } = req.body;
    if (!id_pedido) {
      return res.status(400).json({ error: "id_pedido é obrigatório" });
    }

    // Busca pedido com produtos e itens
    const pedido = await Pedido.findByPk(id_pedido, {
      include: [
        {
          model: Produto,
          through: { attributes: ["quantidade", "preco_unitario"] }
        }
      ]
    });

    if (!pedido) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }

    if (pedido.status === "concluido") {
      return res.status(400).json({ error: "Pedido já concluído" });
    }

    // Calcula valor total da venda
    let valor_total = 0;
    for (const produto of pedido.Produtos) {
      const { quantidade, preco_unitario } = produto.PedidoProduto;
      valor_total += Number(preco_unitario) * Number(quantidade);
    }

    // Cria venda
    const venda = await Venda.create(
      { id_pedido: pedido.id_pedido, valor_total },
      { transaction: t }
    );

    // Atualiza status do pedido
    await pedido.update({ status: "concluido" }, { transaction: t });

    await t.commit();
    res.status(201).json({ message: "Venda registrada com sucesso", venda });
  } catch (err) {
    await t.rollback();
    res.status(400).json({ error: err.message });
  }
});

// Listar todas as vendas
router.get("/", async (req, res) => {
  try {
    const vendas = await Venda.findAll({ order: [["data_venda", "DESC"]] });
    res.json(vendas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;