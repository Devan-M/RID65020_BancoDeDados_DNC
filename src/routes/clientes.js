const express = require("express");
const router = express.Router();
const Cliente = require("../models/Cliente");

// Criar cliente
router.post("/", async (req, res) => {
  try {
    const { nome, email, telefone, endereco } = req.body;

    // Validação simples
    if (!nome || !email) {
      return res.status(400).json({ error: "Nome e email são obrigatórios" });
    }

    const cliente = await Cliente.create({ nome, email, telefone, endereco });
    res.status(201).json(cliente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Listar todos os clientes
router.get("/", async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Buscar cliente por ID
router.get("/:id", async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }
    res.json(cliente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Atualizar cliente
router.put("/:id", async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    await cliente.update(req.body);
    res.json(cliente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remover cliente
router.delete("/:id", async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    await cliente.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;