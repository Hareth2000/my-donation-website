const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database").sequelize;
const { Users } = require("./users");

const Reports = sequelize.define("reports", {
  report_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Users,
      key: "user_id",
    },
    allowNull: false,
  },
  action: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = { Reports };
