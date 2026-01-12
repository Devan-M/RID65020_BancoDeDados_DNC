const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Pedido = sequelize.define("Pedido", {
  id_pedido: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  data_pedido: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  status: { type: DataTypes.ENUM("pendente", "concluido", "cancelado"), defaultValue: "pendente" }
});

module.exports = Pedido;