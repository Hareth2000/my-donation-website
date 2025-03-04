const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database").sequelize;
const { Users } = require("./users");

const Notifications = sequelize.define("notifications", {
  notification_id: {
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
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("unread", "read"),
    defaultValue: "unread",
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = { Notifications };
