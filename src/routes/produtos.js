const express = require("express");
const router = express.Router();
const Produto = require("../models/Produto");

// Criar produto
router.post("/", async (req, res) => {
  try {
    const { nome, descricao, preco, categoria, quantidade_estoque } = req.body;

    if (!nome || !preco) {
      return res.status(400).json({ error: "Nome e preço são obrigatórios" });
    }

    const produto = await Produto.create({
      nome,
      descricao,
      preco,
      categoria,
      quantidade_estoque
    });

    res.status(201).json(produto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Listar todos os produtos
router.get("/", async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Buscar produto por ID
router.get("/:id", async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    res.json(produto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Atualizar produto
router.put("/:id", async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    await produto.update(req.body);
    res.json(produto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remover produto
router.delete("/:id", async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    await produto.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;