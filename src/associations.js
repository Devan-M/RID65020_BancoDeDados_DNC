const sequelize = require("./config/db");
const Cliente = require("./models/Cliente");
const Produto = require("./models/Produto");
const Pedido = require("./models/Pedido");
const Venda = require("./models/Venda");
const PedidoProduto = require("./models/PedidoProduto");

// Cliente 1:N Pedido
Cliente.hasMany(Pedido, { foreignKey: "id_cliente" });
Pedido.belongsTo(Cliente, { foreignKey: "id_cliente" });

// Pedido N:M Produto via PedidoProduto
Pedido.belongsToMany(Produto, {
  through: PedidoProduto,
  foreignKey: "id_pedido",
  otherKey: "id_produto"
});
Produto.belongsToMany(Pedido, {
  through: PedidoProduto,
  foreignKey: "id_produto",
  otherKey: "id_pedido"
});

// Pedido 1:1 Venda
Pedido.hasOne(Venda, { foreignKey: "id_pedido" });
Venda.belongsTo(Pedido, { foreignKey: "id_pedido" });

module.exports = {
  sequelize,
  Cliente,
  Produto,
  Pedido,
  Venda,
  PedidoProduto
};