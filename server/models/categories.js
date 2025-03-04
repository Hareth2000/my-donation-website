const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database").sequelize;

const Categories = sequelize.define("categories", {
  category_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  category_name: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
});

module.exports = { Categories };
