const sequelize = require("sequelize");

const connection = new sequelize('perguntas', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;