const Sequelize = require("sequelize");
require("dotenv").config();


const sequelize = new Sequelize(process.env.DATA_BASE_URL, {
   
});

module.exports = { sequelize };
