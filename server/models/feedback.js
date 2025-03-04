const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database").sequelize;
const { Users } = require("./users");
const { Donations } = require("./donations");

const Feedback = sequelize.define("feedback", {
  feedback_id: {
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
  donation_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Donations,
      key: "donation_id",
    },
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  comments: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = { Feedback };
