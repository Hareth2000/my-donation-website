const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database').sequelize;

const Payment = sequelize.define('Payment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    itemId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nameOfCard: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    numOfCard: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    month: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    year: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: true,
});

module.exports = Payment;
