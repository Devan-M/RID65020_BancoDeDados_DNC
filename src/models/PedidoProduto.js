const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const PedidoProduto = sequelize.define("PedidoProduto", {
  id_pedido_produto: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  quantidade: { type: DataTypes.INTEGER, allowNull: false },
  preco_unitario: { type: DataTypes.DECIMAL(10,2), allowNull: false }
});

module.exports = PedidoProduto;