const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database").sequelize;

const Requests = sequelize.define(
  "requests",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    organizationName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    organizationAddress: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    toolName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    medicalEquipment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estimatedCost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    proofDocument: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    hasFundraisingLicense: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    agreement: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "approved", "rejected"),
      defaultValue: "pending",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    amount_raised: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "requests",
    timestamps: true,
  }
);

module.exports = { Requests };