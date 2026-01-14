// src/routes/pedidos.js
const express = require("express");
const router = express.Router();
const sequelize = require("../config/db");
const Cliente = require("../models/Cliente");
const Produto = require("../models/Produto");
const Pedido = require("../models/Pedido");
const PedidoProduto = require("../models/PedidoProduto");

// Criar pedido com itens
// Body esperado:
// {
//   "id_cliente": 1,
//   "itens": [
//     { "id_produto": 1, "quantidade": 2 },
//     { "id_produto": 3, "quantidade": 1 }
//   ]
// }
router.post("/", async (req, res) => {
  try {
    const { id_cliente, itens } = req.body;

    if (!id_cliente || !Array.isArray(itens) || itens.length === 0) {
      return res.status(400).json({ error: "id_cliente e itens são obrigatórios" });
    }

    const cliente = await Cliente.findByPk(id_cliente);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    // Cria transação dentro do try
    const t = await sequelize.transaction();

    try {
      // Cria o pedido
      const pedido = await Pedido.create(
        { id_cliente, status: "pendente" },
        { transaction: t }
      );

      // Processa itens
      for (const item of itens) {
        const produto = await Produto.findByPk(item.id_produto, { transaction: t });
        if (!produto) throw new Error(`Produto ${item.id_produto} não encontrado`);

        if (produto.quantidade_estoque < item.quantidade) {
          throw new Error(`Estoque insuficiente para o produto ${produto.nome}`);
        }

        // Cria relação pedido-produto
        await PedidoProduto.create(
          {
            id_pedido: pedido.id_pedido,
            id_produto: produto.id_produto,
            quantidade: item.quantidade,
            preco_unitario: produto.preco
          },
          { transaction: t }
        );

        // Atualiza estoque
        await produto.update(
          { quantidade_estoque: produto.quantidade_estoque - item.quantidade },
          { transaction: t }
        );
      }

      await t.commit();
      return res.status(201).json({
        message: "Pedido criado com sucesso",
        pedido_id: pedido.id_pedido
      });
    } catch (err) {
      await t.rollback();
      return res.status(400).json({ error: err.message });
    }

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Detalhar pedido (com itens e cliente)
router.get("/:id", async (req, res) => {
  try {
    const pedido = await Pedido.findByPk(req.params.id, {
      include: [
        { model: Cliente, attributes: ["id_cliente", "nome", "email"] },
        {
          model: Produto,
          through: { attributes: ["quantidade", "preco_unitario"] }
        }
      ]
    });

    if (!pedido) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }

    res.json(pedido);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;