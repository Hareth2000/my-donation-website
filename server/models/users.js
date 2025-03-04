


const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database").sequelize;

const Users = sequelize.define("users", {
  user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(100), unique: true, allowNull: false },
  password: { type: DataTypes.STRING(255), allowNull: false },
  phone: { type: DataTypes.STRING(20), allowNull: true },
  address: { type: DataTypes.TEXT, allowNull: true },
  user_type: { type: DataTypes.ENUM("donor", "beneficiary", "admin"), allowNull: false },
  verified: { type: DataTypes.BOOLEAN, defaultValue: false },
});

module.exports = { Users };
