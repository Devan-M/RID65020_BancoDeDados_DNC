const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Venda = sequelize.define("Venda", {
  id_venda: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  data_venda: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  valor_total: { type: DataTypes.DECIMAL(10,2), allowNull: false }
});

module.exports = Venda;