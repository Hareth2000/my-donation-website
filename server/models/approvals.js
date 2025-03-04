const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database").sequelize;
const { Users } = require("./users");
const { Donations } = require("./donations");
const { Requests } = require("./requests");

const Approvals = sequelize.define("approvals", {
  approval_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  admin_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Users,
      key: "user_id",
    },
    allowNull: false,
  },
  donation_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Donations,
      key: "donation_id",
    },
    allowNull: true,
  },
  request_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Requests,
      key: "request_id",
    },
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("approved", "rejected"),
    allowNull: false,
  },
  reason: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = { Approvals };
