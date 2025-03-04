// const { DataTypes } = require("sequelize");
// const sequelize = require("../utils/database").sequelize;
// const { Users } = require("./users");

// const Transactions = sequelize.define("transactions", {
//   transaction_id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   user_id: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: Users,
//       key: "user_id",
//     },
//     allowNull: false,
//   },
//   amount: {
//     type: DataTypes.DECIMAL(10, 2),
//     allowNull: false,
//   },
//   payment_method: {
//     type: DataTypes.ENUM("Credit Card", "PayPal", "Bank Transfer"),
//     allowNull: false,
//   },
//   status: {
//     type: DataTypes.ENUM("pending", "completed", "failed"),
//     defaultValue: "pending",
//   },
//   created_at: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//   },
// });

// module.exports = { Transactions };


const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database").sequelize;
const { Users } = require("./users");

const Transactions = sequelize.define("transactions", {
  transaction_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, references: { model: Users, key: "user_id" }, allowNull: false },
  amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  status: { type: DataTypes.ENUM("pending", "completed", "failed"), defaultValue: "pending" },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
})

module.exports = { Transactions };
