const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database").sequelize;
const { Donations } = require("./donations");

const MedicalItems = sequelize.define("medical_items", {
  item_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  donation_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Donations,
      key: "donation_id",
    },
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  condition: {
    type: DataTypes.ENUM("new", "used"),
    allowNull: false,
  },
  expiration_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  image_url: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
});

module.exports = { MedicalItems };
