const Sequelize = require("sequelize");
const sequelize = require("../connection/connect");

const Order = sequelize.define("order", {
  uuid: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  total: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports =  Order;
